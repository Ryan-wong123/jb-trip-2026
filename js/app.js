(function () {
  'use strict';
  var T = window.TRIP;
  var P = T.places, DAYS = T.days, HOTEL = T.hotelCost;
  var TABS = [['overview', 'Overview'], ['day1', 'Day 1'], ['day2', 'Day 2'], ['day3', 'Day 3']];
  var SCN = { low: 'Low estimate', plan: 'Planning estimate', high: 'High estimate' };
  var state = { tab: 'overview', sc: 'plan', cur: 'RM', sel: 'hotel' };
  var map = null, layer = null;

  var dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  function dayColor(d) { return dark ? d.colorDark : d.color; }

  function sum(rows, sc) { return rows.reduce(function (a, r) { return a + r[sc]; }, 0); }
  function money(rm) {
    if (state.cur === 'SGD') return 'SGD ' + Math.round(rm / T.rate).toLocaleString('en-US');
    return 'RM ' + Math.round(rm).toLocaleString('en-US');
  }
  function dayTotal(id) { return sum(DAYS[id].costs, state.sc); }
  function grandTotal() { return dayTotal('day1') + dayTotal('day2') + dayTotal('day3') + HOTEL[state.sc]; }
  function el(id) { return document.getElementById(id); }

  function placeUrl(p) {
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(p.name) + '&query_place_id=' + p.pid;
  }
  function dayRouteUrl(id) {
    var s = DAYS[id].stops, pt = function (x) { return P[x.p].lat + ',' + P[x.p].lng; };
    var url = 'https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=' + encodeURIComponent(pt(s[0])) +
      '&destination=' + encodeURIComponent(pt(s[s.length - 1]));
    var mid = s.slice(1, -1).map(pt).join('|');
    if (mid) url += '&waypoints=' + encodeURIComponent(mid);
    return url;
  }

  function visibleIds() {
    if (state.tab === 'overview') return Object.keys(P);
    var seen = {}, out = [];
    DAYS[state.tab].stops.forEach(function (s) { if (!seen[s.p]) { seen[s.p] = 1; out.push(s.p); } });
    return out;
  }
  function routes() { return state.tab === 'overview' ? ['day1', 'day2', 'day3'] : [state.tab]; }

  /* ---------- panel ---------- */
  function renderTabs() {
    el('tabs').innerHTML = TABS.map(function (t) {
      return '<button type="button" role="tab" data-tab="' + t[0] + '" aria-selected="' + (state.tab === t[0]) + '">' + t[1] + '</button>';
    }).join('');
  }

  function overviewHTML() {
    var rows = ['day1', 'day2', 'day3'].map(function (id) {
      var d = DAYS[id];
      return '<li class="plan"><a href="#' + id + '"><span class="muted">' + d.label + ', ' + d.date + '</span><h3>' + d.title + '</h3>' + (d.tagline ? '<p class="tagline" style="font-size:17px">' + d.tagline + '</p>' : '') + '</a></li>';
    }).join('');
    return '' +
      '<div class="card hero"><div class="hearts" aria-hidden="true">&#10084; &#10084; &#10084;</div><p>' + T.intro + '</p></div>' +
      '<div class="card"><h2>Our three days</h2><ol class="stops" style="margin-top:6px">' + rows + '</ol></div>' +
      '<div class="warn"><strong>Check before you go.</strong> ' + DAYS.day1.warn + '</div>';
  }

  function dayHTML(id) {
    var d = DAYS[id];
    var stops = d.stops.map(function (s) {
      var p = P[s.p], sel = state.sel === s.p ? ' sel' : '';
      return '<li class="stop' + sel + '" data-pid="' + s.p + '" tabindex="0" role="button" aria-label="Show ' + p.name + ' on the map">' +
        '<span class="t">' + s.t + '</span><span class="badge ' + p.kind + '">' + p.n + '</span>' +
        '<div><h3>' + p.name + '</h3><p>' + s.note + '</p></div></li>';
    }).join('');
    var warn = d.warn ? '<div class="warn"><strong>Check before you go.</strong> ' + d.warn + '</div>' : '';
    return '' +
      '<div class="card"><div class="daybar"><span class="dot" style="background:' + dayColor(d) + '"></span><span class="muted" style="font-weight:600">' + d.date + '</span></div>' +
      '<h2>' + d.title + '</h2>' + (d.tagline ? '<p class="tagline">' + d.tagline + '</p>' : '') +
      '<ol class="stops">' + stops + '</ol>' +
      '<a class="btn" href="' + dayRouteUrl(id) + '" target="_blank" rel="noopener">Open ' + d.label + ' route in Google Maps</a></div>' +
      warn;
  }

  function renderPanel() { el('panel').innerHTML = state.tab === 'overview' ? overviewHTML() : dayHTML(state.tab); }

  /* ---------- map ---------- */
  function initMap() {
    var host = el('map');
    if (typeof L === 'undefined') {
      host.innerHTML = '<div class="mapmsg">The map needs an internet connection to load. The plan and costs still work, and every stop has a Google Maps link below.</div>';
      return;
    }
    map = L.map(host, { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    layer = L.layerGroup().addTo(map);
  }

  // Real driving geometry from the public OSRM server, cached per day. Falls back to a dashed straight line if it is unreachable.
  var roadCache = {}, drawToken = 0;
  var ROUTERS = [
    'https://router.project-osrm.org/route/v1/driving/',
    'https://routing.openstreetmap.de/routed-car/route/v1/driving/'
  ];
  function tryRouter(i, tail) {
    if (i >= ROUTERS.length) return Promise.reject(new Error('all routers failed'));
    var ctl = new AbortController(), timer = setTimeout(function () { ctl.abort(); }, 9000);
    return fetch(ROUTERS[i] + tail, { signal: ctl.signal }).then(function (r) { clearTimeout(timer); return r.json(); }).then(function (j) {
      if (!j.routes || !j.routes[0]) throw new Error('no route');
      return j.routes[0].geometry.coordinates.map(function (c) { return [c[1], c[0]]; });
    }).catch(function () { clearTimeout(timer); return tryRouter(i + 1, tail); });
  }
  function fetchRoad(id) {
    if (roadCache[id]) return roadCache[id];
    var coords = DAYS[id].stops.map(function (s) { return P[s.p].lng + ',' + P[s.p].lat; }).join(';');
    roadCache[id] = tryRouter(0, coords + '?overview=full&geometries=geojson');
    roadCache[id].catch(function () { delete roadCache[id]; });
    return roadCache[id];
  }
  function setStatus(id, txt) { var n = document.getElementById('rs-' + id); if (n) n.textContent = txt; }
  function drawRoute(id) {
    var d = DAYS[id], token = drawToken;
    var straight = L.polyline(d.stops.map(function (s) { return [P[s.p].lat, P[s.p].lng]; }),
      { color: dayColor(d), weight: 3, opacity: 0.6, dashArray: '8 7' }).addTo(layer);
    setStatus(id, 'loading road route...');
    fetchRoad(id).then(function (pts) {
      if (token !== drawToken) return;
      layer.removeLayer(straight);
      L.polyline(pts, { color: dayColor(d), weight: 4, opacity: 0.9, lineJoin: 'round' }).addTo(layer).bringToBack();
      setStatus(id, 'by road');
    }).catch(function () { if (token === drawToken) setStatus(id, 'straight line only, road service unreachable'); });
  }

  function renderMap(refit) {
    var ids = visibleIds();
    if (map) {
      drawToken++;
      layer.clearLayers();
      var all = [];
      routes().forEach(function (id) { drawRoute(id); });
      ids.forEach(function (id) {
        var p = P[id], sel = id === state.sel;
        var icon = L.divIcon({
          className: '', iconSize: [26, 26], iconAnchor: [13, 13],
          html: '<div class="pinicon ' + p.kind + (sel ? ' sel' : '') + '">' + p.n + '</div>'
        });
        var m = L.marker([p.lat, p.lng], { icon: icon, title: p.name, zIndexOffset: sel ? 1000 : 0, keyboard: true }).addTo(layer);
        m.on('click', function () { select(id, false); });
        all.push([p.lat, p.lng]);
      });
      if (refit) map.fitBounds(all, { padding: [34, 34], maxZoom: 15 });
    }
    el('legend').innerHTML = ids.map(function (id) {
      var p = P[id];
      return '<button type="button" data-pid="' + id + '" aria-pressed="' + (id === state.sel) + '"><span class="badge ' + p.kind + '">' + p.n + '</span>' + p.short + '</button>';
    }).join('');
    el('keyline').innerHTML = routes().map(function (id) {
      var d = DAYS[id];
      return '<span><i style="border-color:' + dayColor(d) + '"></i>' + d.label + ' route (<span id="rs-' + id + '"></span>)</span>';
    }).join('');
  }

  function renderDetail() {
    var p = P[state.sel];
    el('detail').innerHTML = '<h3>' + p.n + '. ' + p.name + '</h3><p>' + p.addr + '</p><p style="margin-top:6px">' + p.hours + '</p>' +
      '<a class="go" href="' + placeUrl(p) + '" target="_blank" rel="noopener">Open in Google Maps</a>';
  }

  function select(pid, pan) {
    state.sel = pid;
    renderPanel(); renderMap(false); renderDetail();
    if (pan && map) map.panTo([P[pid].lat, P[pid].lng]);
  }

  /* ---------- routing and events ---------- */
  function routeFromHash() {
    var h = (location.hash || '').replace('#', '');
    var tab = TABS.some(function (t) { return t[0] === h; }) ? h : 'overview';
    state.tab = tab;
    state.sel = tab === 'overview' ? 'hotel' : DAYS[tab].stops[0].p;
    renderTabs(); renderPanel(); renderMap(true); renderDetail();
  }
  window.addEventListener('hashchange', routeFromHash);

  el('tabs').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-tab]'); if (!b) return;
    var t = b.getAttribute('data-tab');
    if (location.hash === '#' + t) routeFromHash(); else location.hash = t;
  });
  function pidFrom(e) { var n = e.target.closest('[data-pid]'); return n ? n.getAttribute('data-pid') : null; }
  ['legend', 'panel'].forEach(function (id) {
    var node = el(id);
    node.addEventListener('click', function (e) { var p = pidFrom(e); if (p) select(p, true); });
    node.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { var p = pidFrom(e); if (p) { e.preventDefault(); select(p, true); } }
    });
  });

  initMap();
  routeFromHash();
})();
