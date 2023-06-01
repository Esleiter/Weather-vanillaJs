# Weather App with Vanilla JS 🌈
***
This project is a web application developed with pure JavaScript (Vanilla JS) that uses the Tomorrow.io API to display the weather forecast on a web page. It allows to obtain the current and forecast weather for approximate or exact locations through geolocation. Use emojis and descriptions to visually represent weather conditions. The application is dynamic and updates the data in real time.

* [Demo](https://weather.esleiter.com/): https://weather.esleiter.com

## Table of Contents
1. [Description](#Description)
2. [Screenshot](#Screenshot)

## Description

The project is developed with pure JavaScript, which gets weather data from the Tomorrow.io API and displays it on a web page.

Imports the apiKey from a config.js file.

```js
const apiKey = 'Your-Api-Key';

export default apiKey;
```

Initializes an empty dataApi array to store the retrieved weather data.

Defines a codeWeather object that assigns weather codes to the corresponding emoji and descriptions.

The getWeatherApi function is defined as an asynchronous function that takes a posi (position) parameter and gets weather data from the Tomorrow.io API using the provided API key. It uses the seek function to make a GET request to the API endpoint and wait for the response. The response is then converted to JSON format. Weather data is extracted from the response and stored in the dataApi array. The function also generates HTML markup for each day's weather information using dataApi and updates the HTML element with the id "weather" to display the weather forecast.

The getWeatherInPositionIp function is defined as an asynchronous function that gets the approximate location of the user using the IP address from the ipinfo.io API. Wait for the response and extract the city and region information from the response data. It then updates the HTML element with the id "loc" to show the approximate location and a button to load the exact location.

The weatherInPositionGps function is defined as an asynchronous function that takes a position parameter (the exact geographic location of the user) and updates the HTML element with the id "loc" to display the exact location.

The getWeatherInPositionGps function is defined as an asynchronous function that checks if the browser supports geolocation. If it does, it calls the function navigator.geolocation.getCurrentPosition to get the current position of the user. The weatherInPositionGps function is passed as a callback to handle the returned position. If geolocation is not supported, an alert is displayed.

The getWeatherInPositionGps function is assigned to the window object to make it globally accessible.

Finally, the getWeatherInPositionIp function is called to get the weather data based on the approximate location obtained from the IP address.

## Screenshots
![Approximate](https://raw.githubusercontent.com/Esleiter/Clima-vanillaJs/codespace-esleiter-probable-parakeet-p5gjj9655cq5v/img/screenShot/approximate.jpeg)
![Alert](https://raw.githubusercontent.com/Esleiter/Clima-vanillaJs/codespace-esleiter-probable-parakeet-p5gjj9655cq5v/img/screenShot/alert.jpeg)
![Exact](https://raw.githubusercontent.com/Esleiter/Clima-vanillaJs/codespace-esleiter-probable-parakeet-p5gjj9655cq5v/img/screenShot/exact.jpeg)
