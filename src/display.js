import { getForecastDataFor } from "./api-interactions";

const displayHandler = (function handleDisplay() {
  const locationInput = document.querySelector("#location-input");
  const searchBtn = document.querySelector(".search-btn");
  const locationTitle = document.querySelector("h2");
  const tempBtn = document.querySelector("#temp-btn");

  const timeSpan = document.querySelector("#current-time");
  const tempSpan = document.querySelector("#current-temp");
  const weatherSpan = document.querySelector("#current-weather");
  const sunsetSpan = document.querySelector("#current-sunset");
  const loadingDiv = document.querySelector(".loading");
    
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
  function changeTempSpan() {
   
      if (fahrenheit === true) {
          tempSpan.textContent = `${storedData.tempFDay1} °F`;
        } else {
          tempSpan.textContent = `${storedData.tempCDay1} °C`;
        }
  }

    // Event listener for the °F/°C Btn to toggle the temperature
  tempBtn.addEventListener("click", (e) => {
  
      toggleFTemp();
      changeTempSpan();
      tempBtn.textContent = fahrenheit ? "°F" : "°C";
  });

    // Reset  weather data displayed content
  function resetSpans() {
    timeSpan.textContent = "";
    tempSpan.textContent = "";
    weatherSpan.textContent = "";
    sunsetSpan.textContent = "";
  }

    // fetches and displays content from searched location
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (getLocationValue() === "") {
      loadingDiv.textContent = "Enter a location";
      return loadingDiv.textContent;
    }

    locationTitle.textContent = "";
    loadingDiv.textContent = "Loading...";

    getForecastDataFor(getLocationValue(), 3)
      .then((data) => {
        locationTitle.textContent = `${data.name}, ${data.region}, ${data.country}`;
        timeSpan.textContent = data.dateDay1;
        if (fahrenheit === true) {
          tempSpan.textContent = `${data.tempFDay1} °F`;
        } else {
          tempSpan.textContent = `${data.tempCDay1} °C`;
        }
        weatherSpan.textContent = data.conditionDay1;
        sunsetSpan.textContent = data.sunsetDay1;
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
    

  return {
    toggleFTemp,
    resetSpans,
  };
    
})();

export default { displayHandler };
