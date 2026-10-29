(function () {
  'use strict';
  var T = window.TRIP, DAYS = T.days, SC = 'plan', cur = 'RM';
  function money(rm) {
    return cur === 'SGD' ? 'SGD ' + Math.round(rm / T.rate).toLocaleString('en-US') : 'RM ' + Math.round(rm).toLocaleString('en-US');
  }
  function sum(rows) { return rows.reduce(function (a, r) { return a + r[SC]; }, 0); }
  function render() {
    var ids = ['day1', 'day2', 'day3'], hotel = T.hotelCost[SC];
    var tot = hotel, grab = 0, fixed = 0, est = 0;
    ids.forEach(function (id) {
      tot += sum(DAYS[id].costs);
      DAYS[id].costs.forEach(function (r) {
        if (r.k === 'grab') grab += r[SC]; else if (r.k === 'fixed') fixed += r[SC]; else est += r[SC];
      });
    });
    var alt = cur === 'RM' ? '&asymp; SGD ' + Math.round(tot / T.rate) : '&asymp; RM ' + Math.round(tot).toLocaleString('en-US');
    var html = '<div class="card"><div class="eyebrow">Total, ' + T.people + ' people</div>' +
      '<div class="big" style="margin-top:8px">' + money(tot) + '<small>' + alt + '</small></div></div>';
    ids.forEach(function (id) {
      var d = DAYS[id];
      var rows = d.costs.map(function (r) {
        var chip = r.k === 'fixed' ? '<span class="chip fixed">Fixed</span>' : (r.k === 'skip' ? '' : '<span class="chip">Est.</span>');
        return '<tr><td>' + r.l + chip + '</td><td class="num">' + (r.k === 'skip' ? '<span class="muted">Skipped</span>' : money(r[SC])) + '</td></tr>';
      }).join('');
      rows += '<tr class="total"><td>' + d.label + ' total</td><td class="num">' + money(sum(d.costs)) + '</td></tr>';
      html += '<div class="card"><h2>' + d.label + ', ' + d.date + '</h2><p class="muted" style="font-size:14px;margin-top:2px">' + d.title + '</p>' +
        '<div class="scroll" style="margin-top:6px"><table><tbody>' + rows + '</tbody></table></div></div>';
    });
    html += '<div class="card"><h2>Hotel</h2><div class="scroll" style="margin-top:6px"><table><tbody>' +
      '<tr><td>' + T.hotelCost.label + '<span class="chip fixed">Fixed</span><small>Paragon Suites @ CIQ</small></td><td class="num">' + money(hotel) + '</td></tr></tbody></table></div></div>' +
      '<div class="card"><h2>Where the money goes</h2><div class="scroll" style="margin-top:6px"><table><tbody>' +
      '<tr><td>Confirmed prices<span class="chip fixed">Fixed</span></td><td class="num">' + money(fixed + hotel) + '</td></tr>' +
      '<tr><td>Estimated meals<span class="chip">Est.</span></td><td class="num">' + money(est) + '</td></tr>' +
      '<tr><td>Grab rides<span class="chip">Est.</span><small>One car for both of you</small></td><td class="num">' + money(grab) + '</td></tr>' +
      '<tr class="total"><td>Total</td><td class="num">' + money(tot) + '</td></tr>' +
      '</tbody></table></div></div>';
    document.getElementById('costs').innerHTML = html;
    document.querySelectorAll('#curSeg button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-cur') === cur)); });
  }
  document.getElementById('curSeg').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-cur]'); if (!b) return;
    cur = b.getAttribute('data-cur'); render();
  });
  render();
})();
