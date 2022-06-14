function displayTemperature(response){
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windspeedElement = document.querySelector("#windspeed");

temperatureElement.innerHTML = Math.round(response.data.main.temp); 
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windspeedElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "90bc7e62af1e08f18b00cf6e3cfcd85b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Suva&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);