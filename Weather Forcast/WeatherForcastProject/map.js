// const API_KEY = '8431e96731869aecfa8db7e9aa320d85'; // Get from https://openweathermap.org/api

// const map = L.map('map').setView([20, 0], 2); // World view

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '© OpenStreetMap contributors'
// }).addTo(map);

// map.on('click', async function(e) {
//   const lat = e.latlng.lat;
//   const lon = e.latlng.lng;

//   const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

//   const res = await fetch(weatherURL);
//   const data = await res.json();

//   const info = `
//     <h2>${data.name || 'Unknown Location'}</h2>
//     <p>🌡️ Temperature: ${data.main.temp} °C</p>
//     <p>🌥️ Weather: ${data.weather[0].description}</p>
//     <p>💨 Wind: ${data.wind.speed} m/s</p>
//     <p>☁️ Clouds: ${data.clouds.all}%</p>
//     `;

//   document.getElementById('weather-info').innerHTML = info;

//   L.popup()
//     .setLatLng(e.latlng)
//     .setContent(`<b>${data.name || 'Here'}</b><br>${data.weather[0].main}, ${data.main.temp}°C`)
//     .openOn(map);
// });
const apiKey = 'aa5436c4d38dbe8bdabccc70fa64d97c'; // Replace with your API key

// Initialize the map
const map = L.map('map1').setView([20, 0], 2);

// Add base layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add weather overlays
const overlays = {
  Temperature: L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`, { opacity: 0.5 }),
  Wind: L.tileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`, { opacity: 1 }),
  Clouds: L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`, { opacity: 1 }),
  Rain: L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`, { opacity: 1 })
};

// Add default overlay (e.g. Temperature)
overlays.Temperature.addTo(map);

// Layer control to switch overlays
L.control.layers(null, overlays).addTo(map);
