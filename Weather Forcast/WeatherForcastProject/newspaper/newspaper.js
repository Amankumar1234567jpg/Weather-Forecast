const NEWS_API_KEY = 'aa765c9598ba4382861a21d6a4c286d8';
const WEATHER_API_KEY = '8431e96731869aecfa8db7e9aa320d85';

function showTab(event, tabId) {
  const allTabs = document.querySelectorAll('.tab-content');
  const allButtons = document.querySelectorAll('.tab-btn');

  allTabs.forEach(tab => tab.classList.remove('active'));
  allButtons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');

  if (tabId === 'weather') {
    getWeather();
  } else {
    fetchNews(tabId);
  }
}

function fetchNews(category) {
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&pageSize=6&apiKey=${NEWS_API_KEY}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const newsList = document.getElementById(`${category}-news`);
        newsList.innerHTML = '';
  
        if (!data.articles || data.articles.length === 0) {
          newsList.innerHTML = '<li>No articles available.</li>';
          return;
        }
  
        data.articles.forEach(article => {
          const li = document.createElement('li');
          li.classList.add('news-item');
  
          li.innerHTML = `
            <a href="${article.url}" target="_blank">
              <img class="news-img" src="${article.urlToImage || 'https://via.placeholder.com/100'}" alt="News Image">
              <div class="news-text">
                <h4 class="news-text">${article.title}</h4>
                <p class="news-p">${article.description ? article.description.slice(0, 80) + '...' : ''}</p>
              </div>
            </a>
          `;
          newsList.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  }
  

// function getWeather() {
//   const city = 'Ranchi';
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       const weatherDiv = document.getElementById('weather-result');
//       const iconCode = data.weather[0].icon;
//       const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
//       weatherDiv.innerHTML = `
//         <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
//         <p><strong>Condition:</strong> ${data.weather[0].description}</p>
//         <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
//         <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
//         <img src="${iconUrl}" alt="${data.weather[0].description}" />
//       `;
//     })
//     .catch(error => console.error('Error fetching weather:', error));
// }

// Initialize with World News
// document.addEventListener::contentReference[oaicite:4]{index=4}
 
