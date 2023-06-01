import apiKey from "./config.js";

let dataApi = [];

let codeWeather = {
    "0": ["😶", "Unknown"],
    "1000": ["☀️", "Clear, Sunny"],
    "1100": ["⛅", "Mostly Clear"],
    "1101": ["🌥", "Partly Cloudy"],
    "1102": ["☁☁", "Mostly Cloudy"],
    "1001": ["☁️", "Cloudy"],
    "2000": ["🌫", "Fog"],
    "2100": ["🌫", "Light Fog"],
    "4000": ["🌧", "Drizzle"],
    "4001": ["🌧🌧", "Rain"],
    "4200": ["🌧", "Light Rain"],
    "4201": ["⛈", "Heavy Rain"],
    "5000": ["🌨", "Snow"],
    "5001": ["💨", "Bursts"],
    "5100": ["❄", "Light Snow"],
    "5101": ["🌨🌨", "Heavy Snow"],
    "6000": ["🧊", "Freezing Drizzle"],
    "6001": ["🧊", "Freezing Rain"],
    "6200": ["🌧🧊", "Light Freezing Rain"],
    "6201": ["⛈🧊", "Heavy Freezing Rain"],
    "7000": ["☃", "Ice Pellets"],
    "7101": ["🧊🧊", "Heavy Ice Pellets"],
    "7102": ["🧊", "Light Ice Pellets"],
    "8000": ["🌪", "Storm"]
}

const getClimaApi = async (posi) => {
    let response = await fetch("https://api.tomorrow.io/v4/timelines?location="+ posi + "&timesteps=1d&fields=temperature,weatherCode&apikey=" + apiKey);

    let data = await response.json();
    let intervals = data.data.timelines[0].intervals;

    dataApi.unshift(intervals);

    let i = 0;
    let days = dataApi[0].map(e => `
        <div id="forecast-${i++}" class="carousel-item grid h-full place-items-center text-center">
            <p>
               ${new Date(e.startTime).toLocaleDateString('en', { weekday: 'long', day:'numeric', month:'long'})}
               </br>
               <span class="text-6xl text-fff">${e.values.temperature}</span>°C
               </br></br>
               <span class="text-8xl">${codeWeather[e.values.weatherCode][0]}</span>
               </br>
               ${codeWeather[e.values.weatherCode][1]}
               </br></br></br>
               <a href="#forecast-${i}" id="nextDay-${i}">⬇️</br>Next day</a>
               <a href="#forecast-0" class="day-${i}">⬆️</br>Current weather</a>
            </p>
        </div>
    `).join("")
    document.getElementById("weather").innerHTML = "";
    document.getElementById("weather").innerHTML += days;
}

const getWeatherInPositionIp = async () => {
    let dataIp = await fetch("https://ipinfo.io/json");
    let data = await dataIp.json();
    document.getElementById("loc").innerHTML = 
    "Approximate location: </br><p class='text-2xl'>" + data.city + ", " + data.region + "  🗺️📌</p></br>" +
    "<button onclick='getWeatherInPositionGps()' class='btnPos text-fff p-2'>Load exact location</button>";

    getClimaApi(data.loc);
}

const weatherInPositionGps = async (position) => {
    let pos = position.coords.latitude + ", " + position.coords.longitude;
    document.getElementById("loc").innerHTML = "Exact location: </br><p class='text-2xl'>" + pos + "  🗺️📌</p>";
    getClimaApi(pos);
}

const getWeatherInPositionGps = async (position) => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
    } else { 
        navigator.geolocation.getCurrentPosition(weatherInPositionGps);
    }
}
window.getWeatherInPositionGps = getWeatherInPositionGps;

getWeatherInPositionIp();