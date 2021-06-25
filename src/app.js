let city = "Toronto";

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

function displayForecast(response) {
  let dailyForecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let days = ["Sat", "Sun", "Mon", "Tues", "Weds", "Thurs", "Fri"];

  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2" style="width: 14.25%;">
  <div class="forecast-date">${forecastDay.dt}</div>
  <img
    src="http://openweathermap.org/img/wn/
    ${forecastDay.weather[0].icon}@2x.png"
    alt="${forecastDay.weather[0].description}"
    width="50px"
    />
    <div class="forecast-temp">
      <span class="forecast-temp-max">${forecastDay.temp.max}°</span>
      <span class="forecast-temp-mins"> ${forecastDay.temp.min}° </span>
     </div>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getFutureForecast(coordinates) {
  console.log(coordinates);
  let apikey = "4c099f4f901402f4288ecadef6fa9e70";
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=${unit}`;
  axios.get(apiURL).then(displayForecast);
  console.log(apiURL);
}

function displayTemp(response) {
  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city-name");
  let currentWeatherElement = document.querySelector("#current-weather");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let feelsLikeElement = document.querySelector("#feels-like");
  let maxTempElement = document.querySelector("#max-temp");
  let dateElement = document.querySelector("#date");
  let weatherIconElement = document.querySelector("#weather-icon");

  celsiusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  currentWeatherElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  weatherIconElement.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);

  getFutureForecast(response.data.coord);
}

function search(city) {
  let apikey = "4c099f4f901402f4288ecadef6fa9e70";
  let unit = "metric";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=${unit}`;
  axios.get(apiurl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  console.log(cityInputElement.value);
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
function displayfahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayfahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Toronto");
