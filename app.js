console.log('js')

const apiKey = '70941c8c7f05051310a8428d0cddd4d6'

const container = document.querySelector('#container')

// const city = 'karachi'

const userInput = document.querySelector('#userInput')
const btn = document.querySelector('#searchBtn')


function fetchWeatherData() {

    const city = userInput.value.trim()
    if (!city) return alert('hey,galat hy dost')

    const apiUrl = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    const loader = document.createElement('img')
    loader.classList.add('loader')
    loader.src = 'assets/02-45-27-186_512.webp'
    container.innerHTML = ''
    container.appendChild(loader)

    // container.insertBefore(loader, container.firstElementChild);
    apiUrl.then(function (result) {
        return result.json()
    }).then((result) => {
        console.log(result)
        if (result.cod !== 200) {
            return container.innerHTML = `<div id='errorImg'>
                <img src="assets/404_-_Copy-removebg-preview.png" alt="">
            </div>`}
        loader.remove()

        const fullDate = new Date();
        const oneLine = fullDate.toLocaleString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        });

        const temp = Math.round(result.main.temp - 273.15)

        let weatherIcon = ''
        if (result.weather[0].main == 'rain' || result.weather[0].main == 'drizzle') {
            weatherIcon = 'assets/4834585-removebg-preview.png'
        } else if (temp >= 1 && temp <= 13) {
            weatherIcon = 'assets/foggy reomve bg.png'
        } else if (temp >= 14 && temp <= 20) {
            weatherIcon = 'assets/cloud_13550331-removebg-preview.png'
        } else if (temp >= 21 && temp <= 30) {
            weatherIcon = 'assets/weather-icon-md-removebg-preview.png'
        } else if (temp >= 31 && temp <= 40) {
            weatherIcon = 'assets/sun-removebg-preview.png'
        } else {
            weatherIcon = 'assets/snow 2bg remove.png'
        }


        container.innerHTML = `<div id='mainDiv'><div id='header' ><i class="fa-solid fa-location-dot"></i><p id="cityName">${result.name}, ${result.sys.country}</p></div>
        <p id='date'>${oneLine}</p>
        <div id="icon-img">
        <img id="weatherIconImg" src="${weatherIcon}" alt="weather icon">
        </div>
        <div id="temp-description">
        <p>${temp} °C</p>
        <p>${result.weather[0].main}</p>
        </div>
        <div id="humidty-wind">
        <div id="humidity"><span><i class="fa-solid fa-droplet"></i>Humidity</span><span> ${result.main.humidity} %</span></div>
        <div id="windSpeed"><span><i class="fa-solid fa-wind"></i>WindSpeed</span><span> ${result.wind.speed} km/hr</span></div>
        </div></div>`
        userInput.value = ''

    }).catch((error) => {
        console.log(error)
    })

}

btn.addEventListener('click', fetchWeatherData)

userInput.addEventListener('keydown', function (ele) {
    if (ele.key == 'Enter') {
        fetchWeatherData()
    }
})

