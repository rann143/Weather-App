import { getForecastDataFor } from "./api-interactions";
import  displayHandler from "./display";


getForecastDataFor("Boston", 3).then((data) => {
  console.log("Guess What's Comming!");
  console.log(data);
  console.log(`${data.name}, ${data.region}, ${data.country}`);
  console.log(data.tempFDay1);
  console.log(data.dateDay1);
});
