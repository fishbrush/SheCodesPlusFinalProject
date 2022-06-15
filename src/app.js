function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="col-2">
                <div class="weather-forecast-date">
                ${day}
                </div>
                <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="50px">
                <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">18° </span> <span class="weather-forecast-temperature-min">12°</span> 
              </div>
            </div>`;
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windspeedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "90bc7e62af1e08f18b00cf6e3cfcd85b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handelSubmit(event) {
  event.preventDefault();
  cityinputElement = document.querySelector("#city-input");
  search(cityinputElement.value);
}

search("Suva");
displayForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);
