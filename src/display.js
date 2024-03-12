import { getForecastDataFor } from "./api-interactions";

const displayHandler = (function handleDisplay() {

  const weatherDisplay = document.querySelector('#display');
  const locationInput = document.querySelector("#location-input");
  const searchBtn = document.querySelector("#search-btn");
  const locationTitle = document.querySelector("h2");
  const tempBtn = document.querySelector("#temp-btn");

  const timeSpan = document.querySelector("#current-time");
  const tempSpan = document.querySelector("#current-temp");
  const weatherSpan = document.querySelector("#current-weather");
  const sunsetSpan = document.querySelector("#current-sunset");

  const tmoTimeSpan = document.querySelector("#tmo-time");
  const tmoTempSpan = document.querySelector("#tmo-temp");
  const tmoWeatherSpan = document.querySelector("#tmo-weather");
  const tmoSunsetSpan = document.querySelector("#tmo-sunset");


  const loadingDiv = document.querySelector(".loading");
  const current24Hour = document.querySelector('#current-24hour');
    
  let storedData; // created variable to store the weather data from the most-recently searched location

  function getLocationValue() {
    let locationValue = locationInput.value;
    return locationValue;
  }
  
  tempBtn.textContent = "°F"; // set tempBtn text to "F"
  let fahrenheit = true; // create boolean for which temperature type is set
  console.log(fahrenheit);
  
    // function that switches between °F/°C
  function toggleFTemp() {
    fahrenheit = !fahrenheit;
    console.log(fahrenheit);
    return fahrenheit;
  }

    // changes the displayed content of the temperature span to °F/°C
  function changeTempDisplays() {

    while (current24Hour.firstChild) {
              current24Hour.removeChild(current24Hour.firstChild);
    }
   
      if (fahrenheit === true) {
        tempSpan.textContent = `${storedData.tempFDay1} °F`;
        tmoTempSpan.textContent = `${storedData.tempFDay2} °F`;
        storedData.hour24Day1.forEach((hour) => {
          console.log(`${hour.time}, ${hour.temp_f}°F`);
          let holder = document.createElement('div');
            let timeDiv = document.createElement('div');
            let tempDiv = document.createElement('div');
            timeDiv.textContent = `${(hour.time).slice(-5)}`;
            tempDiv.textContent = `${hour.temp_f}°F`;
            holder.appendChild(timeDiv);
            holder.appendChild(tempDiv);
            current24Hour.appendChild(holder)
          });
        } else {
        tempSpan.textContent = `${storedData.tempCDay1} °C`;
        tmoTempSpan.textContent = `${storedData.tempCDay2} °C`;
        storedData.hour24Day1.forEach((hour) => {
          console.log(`${hour.time}, ${hour.temp_c}°C`);
          let holder = document.createElement('div');
            let timeDiv = document.createElement('div');
            let tempDiv = document.createElement('div');
            timeDiv.textContent = `${(hour.time).slice(-5)}`;
            tempDiv.textContent = `${hour.temp_c}°C`;
            holder.appendChild(timeDiv);
            holder.appendChild(tempDiv);
            current24Hour.appendChild(holder)
          });
        }
  }

    // Event listener for the °F/°C Btn to toggle the temperature
  tempBtn.addEventListener("click", (e) => {
  
      toggleFTemp();
      tempBtn.textContent = fahrenheit ? "°F" : "°C";
      changeTempDisplays();
      
  });

    // Reset  weather data displayed content
  function resetSpans() {
    timeSpan.textContent = "";
    tempSpan.textContent = "";
    weatherSpan.textContent = "";
    sunsetSpan.textContent = "";
    tmoTimeSpan.textContent = "";
    tmoTempSpan.textContent = "";
    tmoWeatherSpan.textContent = "";
    tmoSunsetSpan.textContent = "";
  }

    // fetches and displays content from searched location
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (getLocationValue() === "") {
      loadingDiv.textContent = "Enter a location";
      return loadingDiv.textContent;
    }

    if (weatherDisplay.classList.contains('hidden')) {
      weatherDisplay.classList.remove('hidden');
    }

    locationTitle.textContent = "";
    loadingDiv.textContent = "Loading...";

    while (current24Hour.firstChild) {
              current24Hour.removeChild(current24Hour.firstChild);
    }
    
    

    getForecastDataFor(getLocationValue(), 3)
      .then((data) => {
        locationTitle.textContent = `${data.name}, ${data.region}, ${data.country}`;

        timeSpan.textContent = data.dateDay1;
        tmoTimeSpan.textContent = data.dateDay2;

    
        if (fahrenheit === true) {
          tempSpan.textContent = `${data.tempFDay1} °F`;
          tmoTempSpan.textContent = `${data.tempFDay2} °F`;
          
          data.hour24Day1.forEach((hour) => {
            console.log(`${hour.time}, ${hour.temp_f}°F`);
            let holder = document.createElement('div');
            let timeDiv = document.createElement('div');
            let tempDiv = document.createElement('div');
            timeDiv.textContent = `${(hour.time).slice(-5)}`;
            tempDiv.textContent = `${hour.temp_f}°F`;
            holder.appendChild(timeDiv);
            holder.appendChild(tempDiv);
            current24Hour.appendChild(holder)
          });

        } else {
          tempSpan.textContent = `${data.tempCDay1} °C`;
          tmoTempSpan.textContent = `${data.tempCDay2} °C`;

          
          data.hour24Day1.forEach((hour) => {
            console.log(`${hour.time}, ${hour.temp_c}°C`);
            let holder = document.createElement('div');
            let timeDiv = document.createElement('div');
            let tempDiv = document.createElement('div');
            timeDiv.textContent = `${(hour.time).slice(-5)}`;
            tempDiv.textContent = `${hour.temp_c}°C`;
            holder.appendChild(timeDiv);
            holder.appendChild(tempDiv);
            current24Hour.appendChild(holder)
          });

        }

        weatherSpan.textContent = data.conditionDay1;
        sunsetSpan.textContent = data.sunsetDay1;
        tmoWeatherSpan.textContent = data.conditionDay2;
        tmoSunsetSpan.textContent = data.sunsetDay2;
          loadingDiv.textContent = "";
          storedData = data;
          console.log(storedData.name)
      })
      .catch((err) => {
        console.log(err);
        resetSpans();
        loadingDiv.textContent = "Couldn't find location";
      });

      
      return storedData;
      
  });
    
})();

export default { displayHandler };
