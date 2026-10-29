# JB Trip 2026

A small interactive site for a 3-day, 2-night Johor Bahru trip (Tue 3 to Thu 5 Nov 2026, 2 people, staying at Paragon Suites @ CIQ).

It shows the day-by-day plan, a cost breakdown with Low / Plan / High scenarios in RM or SGD, an interactive OpenStreetMap map with numbered pins, and Google Maps route buttons for each day (each route starts from the hotel).

## Run it

No build step. Open `index.html` in a browser. It needs internet for the map tiles, Leaflet and fonts.

## Edit it

All content lives in `js/data.js`: places, addresses, times, and prices. Prices marked `fixed` were confirmed by the traveller; the rest, including every Grab fare, are estimates. The exchange rate (RM 3.30 per SGD) is set at the top of that file.

## Credits

Map data © OpenStreetMap contributors. Maps by Leaflet.
