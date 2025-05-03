const cityInput = document.querySelector('.city-input')
const searchbtn = document.querySelector('.search-btn')

const weatherInfoSection = document.querySelector('Weather-info')
const notFoundSection = document.querySelector('.not-found')
const searchCitySection = document.querySelector('search-city')

const apiKey = '8431e96731869aecfa8db7e9aa320d85'

searchbtn.addEventListener('click', () => {
    if (cityInput.value.trim() !='') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }
})
cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' &&
        cityInput.value.trim() != ''
    ) {
        updateWeatherInfo(cityInput.value)
        cityInput.value  = ''
        cityInput.blur()
    }
})

async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`

    const response = await fetch(apiUrl)
    return response.json()
}

async function updateWeatherInfo(city){
    const weatherData = await getFetchData('weather', city)

    if (weatherData.cod != 200) {
        showDisplaySection(notFoundSection)
        return
    }

    console.log(weatherData)

    showDisplaySection(weatherInfoSection)
}

async function showDisplaySection(section) {
    [weatherInfoSection, notFoundSection,searchCitySection].forEach(section => {
        if (section) {
            section.style='display = none';
        }
    });

    section.style.display = 'flex'
}