let dataApi = [];
/*let dataApi = [
      [{
        "startTime": "2023-05-27T11:00:00Z",
        "values": {
          "temperature": 27.5,
          "weatherCode": 8000
        }
      },
      {
        "startTime": "2023-05-27T11:00:00Z",
        "values": {
          "temperature": 27.5,
          "weatherCode": 8000
        }
      },
      {
        "startTime": "2023-05-27T11:00:00Z",
        "values": {
          "temperature": 27.5,
          "weatherCode": 8000
        }
      },
      {
        "startTime": "2023-05-27T11:00:00Z",
        "values": {
          "temperature": 27.5,
          "weatherCode": 8000
        }
      },
      {
        "startTime": "2023-05-27T11:00:00Z",
        "values": {
          "temperature": 27.5,
          "weatherCode": 8000
        }
      }]];*/
let codigoTiempo = {
    "0": ["😶", "Desconocido"],
    "1000": ["☀️", "Claro, Soleado"],
    "1100": ["⛅", "Mayormente despejado"],
    "1101": ["🌥", "Parcialmente nublado"],
    "1102": ["☁☁", "Mayormente nublado"],
    "1001": ["☁️", "Nublado"],
    "2000": ["🌫", "Niebla"],
    "2100": ["🌫", "Niebla ligera"],
    "4000": ["🌧", "Llovizna"],
    "4001": ["🌧🌧", "Lluvia"],
    "4200": ["🌧", "Lluvia ligera"],
    "4201": ["⛈", "Lluvia intensa"],
    "5000": ["🌨", "Nieve"],
    "5001": ["💨", "Ráfagas"],
    "5100": ["❄", "Nieve ligera"],
    "5101": ["🌨🌨", "Nieve intensa"],
    "6000": ["🧊", "Llovizna helada"],
    "6001": ["🧊", "Lluvia helada"],
    "6200": ["🌧🧊", "Lluvia helada ligera"],
    "6201": ["⛈🧊", "Lluvia helada intensa"],
    "7000": ["☃", "Bolitas de hielo"],
    "7101": ["🧊🧊", "Pelets de hielo pesado"],
    "7102": ["🧊", "Bolitas de hielo ligeras"],
    "8000": ["🌪", "Tormenta"]
}

const getClimaApi = async (posi) => {
    let response = await fetch("https://api.tomorrow.io/v4/timelines?location="+ posi +
    "&timesteps=1d&fields=temperature,weatherCode&apikey=KtxnTY8mLnsQNxjzZwDCQ8Qh9BR78jXY");

    let data = await response.json();
    let intervals = data.data.timelines[0].intervals;

    dataApi.unshift(intervals);

    let i = 0;
    let days = dataApi[0].map(e => `
        <div id="pronostico-${i++}" class="carousel-item grid h-full place-items-center text-center">
            <p>
               ${new Date(e.startTime).toLocaleDateString('es-es', { weekday: 'long', day:'numeric', month:'long'})}
               </br>
               <span class="text-6xl text-fff">${e.values.temperature}</span>°C
               </br></br>
               <span class="text-8xl">${codigoTiempo[e.values.weatherCode][0]}</span>
               </br>
               ${codigoTiempo[e.values.weatherCode][1]}
               </br></br></br>
               <a href="#pronostico-${i}" id="nextDay-${i}">⬇️</br>Día siguiente</a>
               <a href="#pronostico-0" class="day-${i}">⬆️</br>Clima actual</a>
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
    "aproximada: </br><p class='text-2xl'>" + data.city + ", " + data.region + "  🗺️📌</p></br>" +
    "<button onclick='getWeatherInPositionGps()' class='btnPos text-fff p-2'>Cargar ubicación exacta</button>";

    getClimaApi(data.loc);
}

const weatherInPositionGps = async (position) => {
    let pos = position.coords.latitude + ", " + position.coords.longitude;
    document.getElementById("loc").innerHTML = "exacta: </br><p class='text-2xl'>" + pos + "  🗺️📌</p>";
    getClimaApi(pos);
}

const getWeatherInPositionGps = async (position) => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
    } else { 
        navigator.geolocation.getCurrentPosition(weatherInPositionGps);
    }
}

getWeatherInPositionIp();