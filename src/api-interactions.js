/* eslint-disable import/prefer-default-export */
// fetch('https://api.weatherapi.com/v1/current.json?key=6ec50ea541c74813b6d174204240803&q=london')
//     .then((response) => response.json())
//     .then((response) => console.log(response));

async function getWeatherDataFor(city) {

    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=6ec50ea541c74813b6d174204240803&q=${city}`);
    let jsonData = await response.json();

    return jsonData;
}

export { getWeatherDataFor };