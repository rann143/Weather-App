import { getForecastDataFor } from "./api-interactions";
import  displayHandler from "./display";


getForecastDataFor("Boston", 3).then((data) => {
  console.log("Guess What's Comming!");
  console.log(data);
  console.log(`${data.name}, ${data.region}, ${data.country}`);
  console.log(data.tempFDay1);
  console.log(data.dateDay1);
});

const body = document.querySelector('body');

fetch('https://api.giphy.com/v1/gifs/translate?api_key=DQzLlyYAdHOpDOcKi4YUH5xjz7dMJ9Vs&s=weather', {mode:'cors'})
        .then((response) => response.json())
        .then((response) => {
            body.style.backgroundImage = `url(${response.data.images.original.url})`;
            console.log(response.data);
        })
        .catch(e => {
                console.log(e)
        });