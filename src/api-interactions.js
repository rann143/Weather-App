/* eslint-disable import/prefer-default-export */
// fetch('https://api.weatherapi.com/v1/current.json?key=6ec50ea541c74813b6d174204240803&q=london')
//     .then((response) => response.json())
//     .then((response) => console.log(response));

// eslint-disable-next-line consistent-return
async function getCurrentWeatherDataFor(city) {

    try {
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=6ec50ea541c74813b6d174204240803&q=${city}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        let jsonData = await response.json();

        return jsonData;

    } catch (err) {
        console.error('there was an error with the fetch operation:', err);
        throw err;
    }
}

async function getForecastDataFor(city, days) {
    Number(days);
    String(city);
    if (days < 0 || days > 3) {

        return alert("Must be a 3-day forecast, maximum");

    } 

        try {
            let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6ec50ea541c74813b6d174204240803&q=${city}&days=${days}`);
        
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        
            let jsonData = await response.json();

            return jsonData;

        } catch (err) {
            console.error('there was an error with the fetch operation:', err);
            throw err;
        }
    
}



export { getCurrentWeatherDataFor, getForecastDataFor };
    


