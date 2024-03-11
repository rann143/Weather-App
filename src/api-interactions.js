/* eslint-disable import/prefer-default-export */
// fetch('https://api.weatherapi.com/v1/current.json?key=6ec50ea541c74813b6d174204240803&q=london')
//     .then((response) => response.json())
//     .then((response) => console.log(response));

// eslint-disable-next-line consistent-return
async function getWeatherDataFor(city) {

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

export { getWeatherDataFor };
    


