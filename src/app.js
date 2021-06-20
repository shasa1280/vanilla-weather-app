let apikey = "4c099f4f901402f4288ecadef6fa9e70";
let unit = "metric";
let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${apikey}&units=${unit}`;

axios.get(apiurl).then(displayTemp);

function displayTemp(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city-name");
  let currentWeatherElement = document.querySelector("#current-weather");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let feelsLikeElement = document.querySelector("#feels-like");
  let maxTempElement = document.querySelector("#max-temp");

  letdateElement = document.querySelector("#date");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  currentWeatherElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
}
