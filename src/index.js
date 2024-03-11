import { getWeatherDataFor } from "./api-interactions";
// functions I need:
// function that takes a location and returns the weather data for the location
//  - function for each piece of weather data I want? or one function that gets everything.
//  - If one function, then I will need to filter

// function that can display the weather data on the screen



// practice console-logging weather data
getWeatherDataFor("Somerville").then((data) => {
    console.log("Guess What's Comming!");
    console.log(`${data.location.name}, ${data.location.region}, ${data.location.country}`);
    console.log(data.current);
});