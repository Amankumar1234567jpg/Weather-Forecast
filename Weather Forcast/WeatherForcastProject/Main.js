const apiKey = '8431e96731869aecfa8db7e9aa320d85'; // Replace with your OpenWeatherMap API key
const defaultCity = 'Ranchi,IN';

async function fetchWeatherData(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    if (data.cod === 200) {
      updateCurrentWeather(data);
      fetchForecastData(data.coord.lat, data.coord.lon);
    } else {
      alert('City not found!');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

async function fetchForecastData(lat, lon) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    if (data.cod === '200') {
      updateForecast(data.list);
    } else {
      alert('Forecast data not available!');
    }
  } catch (error) {
    console.error('Error fetching forecast data:', error);
  }
}

function updateCurrentWeather(data) {
  document.getElementById('city-name').textContent = `📍${data.name}, ${data.sys.country}`;
  document.getElementById('temp').textContent = data.main.temp;
  document.getElementById('weather').textContent = data.weather[0].description;
  document.getElementById('wind').textContent = data.wind.speed;
  document.getElementById('clouds').textContent = data.clouds.all;
  document.getElementById('rain').textContent = data.rain ? data.rain['1h'] : 0;
}

function updateForecast(forecastList) {
  const forecastCards = document.getElementById('forecast-cards');
  forecastCards.innerHTML = '';
  for (let i = 0; i < forecastList.length; i += 8) {
    const forecast = forecastList[i];
    const card = document.createElement('div');
    card.classList.add('forecast-card');
    card.innerHTML = `
    <h4>${new Date(forecast.dt_txt).toLocaleDateString()}</h4>
    <p>🌥️  ${forecast.weather[0].description}</p>
    <p>🌡️ ${forecast.main.temp}°C</p>
    <p><i class="material-icons">air</i> ${forecast.wind.speed} km/h</p>
  `;
    forecastCards.appendChild(card);
  }
}

function getWeather() {
  const city = document.getElementById('city-input').value || defaultCity;
  fetchWeatherData(city);
}

// Initialize with default city
fetchWeatherData(defaultCity);



// card.innerHTML = `
//   <h4>${new Date(forecast.dt_txt).toLocaleDateString()}</h4>
//   <p><i class="fas fa-cloud-sun"></i> ${forecast.weather[0].description}</p>
//   <p><i class="fas fa-thermometer-half"></i> ${forecast.main.temp}°C</p>
//   <p><i class="fas fa-wind"></i> ${forecast.wind.speed} km/h</p>
// `;

// card.innerHTML = `
// <h4>${new Date(forecast.dt_txt).toLocaleDateString()}</h4>
// <p>${forecast.weather[0].description}</p>
// <p>Temp: ${forecast.main.temp}°C</p>
// <p>Wind: ${forecast.wind.speed} km/h</p>

// `;