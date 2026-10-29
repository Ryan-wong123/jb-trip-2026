/* All trip content lives here. Edit this file to change places, times or prices.
   Money is in RM for 2 people. low / plan / high are estimates unless kind is "fixed". */
window.TRIP = {
  rate: 3.3, // RM per SGD
  budgetSGD: 400,
  title: "Aum's Birthday Getaway",
  dates: 'Tue 3 to Thu 5 Nov 2026',
  intro: 'Happy birthday, Aum. Three days, two nights and every moment planned for you.',
  people: 2,

  places: {
    hotel: { n: 1, kind: 'stay', name: 'Paragon Suites @ CIQ', short: 'Hotel',
      addr: 'Jalan Inderaputra, Stulang Darat, 80300 Johor Bahru',
      hours: 'Your base for 2 nights (SGD 123 total), about 500 m from CIQ. Google lists the building office as open 9am to 5:30pm and you arrive around 5 to 6pm, so confirm self check-in or late key collection with the host.',
      lat: 1.4681666, lng: 103.7704164, pid: 'ChIJIefRVdcS2jER12Dh9sGFJzw' },
    qq: { n: 2, kind: 'eat', name: 'QQ JB Grill & Steamboat Buffet', short: 'QQ Buffet',
      addr: 'Jalan Permas Barat, Taman Perindustrian Sri Plentong, 81750 Masai, Johor',
      hours: 'Open 4pm to 12am daily. Buffet for 2 is RM 174.',
      lat: 1.4977421, lng: 103.8293956, pid: 'ChIJr-vUaRtr2jERip5brdpreqo' },
    sbs: { n: 7, kind: 'do', name: 'Light Festival, SBS Resort Permas', short: 'Light Festival',
      addr: 'Persiaran Plentong Baru, Kampung Plentong Baru, 81750 Johor Bahru',
      hours: 'Entry for 2 is RM 40. Google lists SBS Resort as closed on Tuesdays. It is now on Day 2 (Wed 4 Nov), but still confirm the festival is open that night.',
      lat: 1.5074348, lng: 103.8137629, pid: 'ChIJ4e_g4u1t2jER37WtjG0am2U' },
    cs: { n: 4, kind: 'eat', name: 'Johor Bahru City Square', short: 'City Square',
      addr: 'Ibrahim International Business District, 106-108, Jalan Wong Ah Fook, 80888 Johor Bahru',
      hours: 'Lunch spot. Mall open 10am to 10pm. Recent reviews say parts of the mall are under renovation.',
      lat: 1.4616534, lng: 103.7638662, pid: 'ChIJZ6vyT8MS2jERZbHkx3oUHnQ' },
    cap: { n: 5, kind: 'do', name: 'Capyba Pet Farm', short: 'Capyba',
      addr: 'PTD 68149 P8, Jalan Persisiran Sutera Danga 1, Taman Sutera Utama, 81300 Skudai, Johor',
      hours: 'Open 9:30am to 6:30pm daily. Entry and feed for 2 is RM 70. The afternoon is hot, so bring water and a hat.',
      lat: 1.5041732, lng: 103.6700501, pid: 'ChIJyX3dIUdz2jERVSNVccCmTn0' },
    spa: { n: 3, kind: 'do', name: 'Bangkok Spa Taman Pelangi', short: 'Bangkok Spa',
      addr: 'No 58 to 62B, Jalan Abiad, Taman Tebrau Jaya, 80400 Johor Bahru',
      hours: 'Open 11am to 5am. Massage for 2 is RM 202. On Day 1 you set out around midnight, so confirm last booking time before you go.',
      lat: 1.4824739, lng: 103.7689644, pid: 'ChIJ43g-sC5t2jERxiPAvNOd1Z8' },
    hut: { n: 6, kind: 'eat', name: 'Hut Dining Buffet, AEON Tebrau City', short: 'Hut Dining',
      addr: 'S45, Second Floor, AEON Mall Tebrau City, Jalan Desa Tebrau, Taman Desa Tebrau, 81100 Johor Bahru',
      hours: 'Dinner sitting 6pm to 10pm. Essence tier for 2 is RM 439.',
      lat: 1.5492688, lng: 103.79641, pid: 'ChIJZ-qQXhlt2jERGRwq2I-1EH8' },
    hdl: { n: 8, kind: 'eat', name: 'Haidilao, Zenith Mall', short: 'Haidilao',
      addr: 'Lot G-02, G-03 and G-03A, Zenith Suasana Iskandar, Jalan Trus, 80888 Johor Bahru',
      hours: 'Open 10:30am to 5am. Lunch for 2 is an estimate.',
      lat: 1.4634203, lng: 103.7623233, pid: 'ChIJ7SMAJzwT2jERT0fVY7nexd8' },
    ciq: { n: 9, kind: 'do', name: 'JB CIQ, Bangunan Sultan Iskandar', short: 'CIQ',
      addr: 'Jalan Lingkaran Dalam, Bukit Chagar, 80300 Johor Bahru',
      hours: 'Open 24 hours. Very close to Zenith Mall and your hotel. Cross before the evening queues.',
      lat: 1.4650537, lng: 103.7668361, pid: 'ChIJhXLPJtIS2jEREx1TUKFPrQw' }
  },

  hotelCost: { label: 'Hotel, 2 nights (SGD 123)', low: 406, plan: 406, high: 406 },

  days: {
    day1: { label: 'Day 1', date: 'Tue 3 Nov', title: 'Arrival, a feast for two and a midnight massage',
      tagline: 'The first evening of your birthday weekend.', color: '#B83A5C', colorDark: '#FF8FAE',
      stops: [
        { p: 'hotel', t: '5 to 6pm', note: 'We arrive, settle in and our weekend begins.' },
        { p: 'qq', t: '7:00pm', note: 'Our first dinner together: grill and steamboat, as much as you like.' },
        { p: 'hotel', t: '9:30pm', note: 'A little time to freshen up and get cosy.' },
        { p: 'spa', t: '12:00am', note: 'A midnight massage for two to melt the day away.' },
        { p: 'hotel', t: '2:00am', note: 'Home to our room to rest, together.' }
      ],
      warn: 'The spa leg starts around midnight, so it is really early Wed 4 Nov, and you would get to bed around 2am. Day 2 starts at 10:30am, so check the last booking time at the spa and that Grab is easy to get at that hour.',
      costs: [
        { l: 'Grab: hotel to QQ Masai', k: 'grab', low: 12, plan: 14, high: 18 },
        { l: 'QQ JB Grill & Steamboat Buffet, 2 people', k: 'fixed', low: 174, plan: 174, high: 174 },
        { l: 'Grab: QQ to hotel', k: 'grab', low: 12, plan: 14, high: 18 },
        { l: 'Grab: hotel to Bangkok Spa (around midnight)', k: 'grab', low: 7, plan: 8, high: 10 },
        { l: 'Bangkok Spa, 2 people', k: 'fixed', low: 202, plan: 202, high: 202 },
        { l: 'Grab: Bangkok Spa to hotel', k: 'grab', low: 7, plan: 8, high: 10 }
      ] },
    day2: { label: 'Day 2', date: 'Wed 4 Nov', title: 'Cuddly critters, a birthday dinner and a night of lights',
      tagline: 'Your birthday day: gentle, playful and glowing.', color: '#B8863B', colorDark: '#F0C070',
      stops: [
        { p: 'hotel', t: '10:30am', note: 'Set off hand in hand. No breakfast today, we save room for lunch.' },
        { p: 'cs', t: '11:00am', note: 'A relaxed lunch date to start your birthday.' },
        { p: 'cap', t: '1:30pm', note: 'Feed the capybaras together and make sweet memories.' },
        { p: 'hut', t: '6:00pm', note: 'Your birthday dinner, the Essence tier. Arrive early to stroll through AEON Tebrau City first.' },
        { p: 'sbs', t: '8:15pm', note: 'Wander under the lights together, the perfect end to your birthday.' },
        { p: 'hotel', t: '10:00pm', note: 'Back to our room, a perfect day behind us.' }
      ],
      warn: 'Google lists SBS Resort Permas as closed on Tuesdays, so Wednesday should be fine, but confirm the Light Festival is open before you rely on the RM 40 tickets. Hut Dining runs 6pm to 10pm, so keep the buffet to about 2 hours to reach the festival. Capyba finishes around 3:30pm, which leaves free time before the 6pm sitting.',
      costs: [
        { l: 'Breakfast skipped', k: 'skip', low: 0, plan: 0, high: 0 },
        { l: 'Grab: hotel to City Square', k: 'grab', low: 5, plan: 6, high: 8 },
        { l: 'Lunch at JB City Square, 2 people', k: 'est', low: 35, plan: 50, high: 70 },
        { l: 'Grab: City Square to Capyba', k: 'grab', low: 16, plan: 19, high: 23 },
        { l: 'Capyba entry and feed, 2 people', k: 'fixed', low: 70, plan: 70, high: 70 },
        { l: 'Grab: Capyba to AEON Tebrau City', k: 'grab', low: 22, plan: 26, high: 31 },
        { l: 'Hut Dining Buffet, Essence tier, 2 people', k: 'fixed', low: 439, plan: 439, high: 439 },
        { l: 'Grab: AEON Tebrau City to Light Festival', k: 'grab', low: 10, plan: 12, high: 15 },
        { l: 'Light Festival entry, 2 people', k: 'fixed', low: 40, plan: 40, high: 40 },
        { l: 'Grab: Light Festival to hotel', k: 'grab', low: 11, plan: 13, high: 16 }
      ] },
    day3: { label: 'Day 3', date: 'Thu 5 Nov', title: 'A last hotpot lunch together',
      tagline: 'One more meal for two before we head home.', color: '#7B4B94', colorDark: '#C9A0E0',
      stops: [
        { p: 'hotel', t: '11:30am', note: 'A slow morning, a nearby breakfast, then check out.' },
        { p: 'hdl', t: '12:00pm', note: 'Sharing a bubbling hotpot, our last meal of the trip.' },
        { p: 'ciq', t: '2:00pm', note: 'Home with a full heart, ahead of the evening queues.' }
      ],
      warn: null,
      costs: [
        { l: 'Breakfast near the hotel, 2 people', k: 'est', low: 20, plan: 30, high: 40 },
        { l: 'Grab: hotel to Zenith Mall', k: 'grab', low: 5, plan: 6, high: 8 },
        { l: 'Haidilao at Zenith Mall, 2 people', k: 'est', low: 160, plan: 200, high: 240 },
        { l: 'Zenith Mall to CIQ, walk or short Grab', k: 'grab', low: 0, plan: 6, high: 8 }
      ] }
  }
};
