import { getCurrentWeatherDataFor, getForecastDataFor } from "./api-interactions";
// functions I need:



// practice console-logging weather data
// getCurrentWeatherDataFor("Boston").then((data) => {
//     console.log("Guess What's Comming!");
//     console.log(`${data.location.name}, ${data.location.region}, ${data.location.country}`);
//     console.log(data.current);
// });

getForecastDataFor("Boston", 3).then((data) => {
    console.log("Guess What's Comming!");
    console.log(data);
    console.log(`${data.location.name}, ${data.location.region}, ${data.location.country}`);
    console.log(data.forecast);
    console.log(data.forecast.forecastday[2].day.maxtemp_f)
    console.log(data.forecast.forecastday[0].date)
});

const locationInput = document.querySelector('#location-input');
const searchBtn = document.querySelector('.search-btn');
const locationTitle = document.querySelector('h2');

const timeSpan = document.querySelector('#current-time');
const tempSpan = document.querySelector('#current-temp');
const weatherSpan = document.querySelector('#current-weather');
const sunsetSpan = document.querySelector('#current-sunset');
const loadingDiv = document.querySelector('.loading');


function resetSpans() {
    timeSpan.textContent = '';
    tempSpan.textContent = '';
    weatherSpan.textContent = '';
    sunsetSpan.textContent = '';
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let locationValue = locationInput.value;
    if (locationValue === '') {
        return alert('must enter a location');
    }

    locationTitle.textContent = "";
    loadingDiv.textContent = 'Loading...';

    getForecastDataFor(locationValue, 3).then((data) => {
        locationTitle.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
        timeSpan.textContent = data.forecast.forecastday[0].date;
        tempSpan.textContent = data.forecast.forecastday[0].day.maxtemp_f;
        weatherSpan.textContent = data.forecast.forecastday[0].day.condition.text;
        sunsetSpan.textContent = data.forecast.forecastday[0].astro.sunset;
        loadingDiv.textContent = "";
    }).catch(err => {
        console.log(err);
        resetSpans();
        loadingDiv.textContent = "Couldn't find location";
    })
})

