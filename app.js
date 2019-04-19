const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "Mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getPosition)
}

async function getPosition(position){
    
    const meteo = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=c8c2a494b61ba9a5fbde5a6f95418266&lang=fr&units=metric`)
        .then(resultat => resultat.json())
        .then(json => json)

    displayWeatherInfos(meteo)
}

async function getWeatherByCity(){
    const ville = document.getElementById('ville').value;

    const meteo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=c8c2a494b61ba9a5fbde5a6f95418266&lang=fr&units=metric`)
        .then(resultat => resultat.json())
        .then(json => json)

    displayWeatherInfos(meteo)
}

function displayWeatherInfos(data) {
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;

    document.getElementById('name').innerHTML = name;
    document.getElementById('temperature').innerHTML = `${Math.round(temperature)}°C`;
    document.getElementById('conditions').innerHTML = conditions;
    document.querySelector('i.wi').className = weatherIcons[conditions];
    document.body.className += ' ' + conditions;

    document.body.className = conditions.toLowerCase();
}

const ville = document.getElementById('ville');

ville.addEventListener('click', () => {
    ville.contentEditable = true;
});

ville.addEventListener('keydown', (e) => {
    if (event.isComposing || event.keyCode === 13) {
        e.preventDefault();
        ville.contentEditable = false;
        //main(false);
        getWeatherByCity();
    }
})

