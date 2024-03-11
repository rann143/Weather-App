/* eslint-disable import/prefer-default-export */
// fetch('https://api.weatherapi.com/v1/current.json?key=6ec50ea541c74813b6d174204240803&q=london')
//     .then((response) => response.json())
//     .then((response) => console.log(response));

async function getForecastDataFor(city, days) {
  Number(days);
  String(city);
  if (days < 0 || days > 3) {
    return alert("Must be a 3-day forecast, maximum");
  }

  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=6ec50ea541c74813b6d174204240803&q=${city}&days=${days}`,
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let jsonData = await response.json();

    let cleanedData = {
      name: jsonData.location.name,
      region: jsonData.location.region,
      country: jsonData.location.country,
      dateDay1: jsonData.forecast.forecastday[0].date,
      tempFDay1: jsonData.forecast.forecastday[0].day.maxtemp_f,
      tempCDay1: jsonData.forecast.forecastday[0].day.maxtemp_c,
      conditionDay1: jsonData.forecast.forecastday[0].day.condition.text,
      sunsetDay1: jsonData.forecast.forecastday[0].astro.sunset,
      dateDay2: jsonData.forecast.forecastday[1].date,
      tempFDay2: jsonData.forecast.forecastday[1].day.maxtemp_f,
      tempCDay2: jsonData.forecast.forecastday[1].day.maxtemp_c,
      conditionDay2: jsonData.forecast.forecastday[1].day.condition.text,
      sunsetDay2: jsonData.forecast.forecastday[1].astro.sunset,
      dateDay3: jsonData.forecast.forecastday[2].date,
      tempFDay3: jsonData.forecast.forecastday[2].day.maxtemp_f,
      tempCDay3: jsonData.forecast.forecastday[2].day.maxtemp_c,
      conditionDay3: jsonData.forecast.forecastday[2].day.condition.text,
      sunsetDay3: jsonData.forecast.forecastday[2].astro.sunset,
    };

    return cleanedData;
  } catch (err) {
    console.error("there was an error with the fetch operation:", err);
    throw err;
  }
}


export { getForecastDataFor };
