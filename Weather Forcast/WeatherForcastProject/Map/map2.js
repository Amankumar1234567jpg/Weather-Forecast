const apiKey = '8431e96731869aecfa8db7e9aa320d85'; // Replace with your OpenWeatherMap API key

// Initialize the map
const map = L.map('map2').setView([20, 0], 2);

// Base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// On map click
map.on('click', async function (e) {
  const { lat, lng } = e.latlng;

  // Fetch weather data
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();

  // Extract weather details
  const temp = data.main.temp;
  const wind = data.wind.speed;
  const clouds = data.clouds.all;
  const rain = data.rain ? data.rain["1h"] || 0 : 0;
  const weather = data.weather[0].description;

  // Create popup content
  const popupContent = `
    <b>Weather Info:</b><br>
    📍 <b>${data.name || "Unknown Location"}</b><br>
    🌡️ Temp: ${temp} °C<br>
    🌬️ Wind: ${wind} m/s<br>
    ☁️ Clouds: ${clouds}%<br>
    🌧️ Rain (1h): ${rain} mm<br>
    🌥️ Condition: ${weather}
  `;

  // Show popup
  L.popup()
    .setLatLng([lat, lng])
    .setContent(popupContent)
    .openOn(map);
});
