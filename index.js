function formatDate() {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Julu",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()} | ${currentHours}:${currentMinutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  return days[day];
}

function displayForecast(response) {
let forecastElement = document.querySelector("#forecast");
let forecast = response.data.daily;
let forcastHTML = `<div class="row">`;
forecast.forEach(function (forecastDay, index) {
  if (index < 6) {
  forcastHTML = forcastHTML +
  `<div class="col-2">
    <div class="forecast-day">${formatDay(forecastDay.time)}</div>
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="" width="70" />
    <div class="forecast-temps">
      <span class="forecast-temp-max">
      ${Math.round(forecastDay.temperature.maximum)}° </span>
      <span class="forecast-temp-min">
      ${Math.round(forecastDay.temperature.minimum)}° </span>
    </div>
  </div>`;
  }
});
  forcastHTML = forcastHTML + `</div>`;
  forecastElement.innerHTML = forcastHTML;
}
  
function getForecast(coordinates) {
  let apiKey = "05ff88a47te358f7cf0o768f24abc234";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityDisplay = document.querySelector("#city");
  cityDisplay.innerHTML = cityInput.value;
}
  
let cityTitle = document.querySelector("#search-form");
cityTitle.addEventListener("submit", displayCity);
  
function displayWeather(response) {
  document.querySelector("#temp-today").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-status").innerHTML =
    response.data.condition.description;
  document.querySelector("#time").innerHTML = formatDate(response.data.time);
  document.querySelector("#icon").setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  document.querySelector("#icon").setAttribute("alt",response.data.condition.descriotion);
  getForecast(response.data.coordinates);
}
  
function findCity(city) {
  let apiKey = "05ff88a47te358f7cf0o768f24abc234";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
  
function enterCity(event) {
  event.preventDefault();
  findCity(document.querySelector("#city-input").value);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", enterCity); 

function showPosition(position) {
  let apiKey = "05ff88a47te358f7cf0o768f24abc234";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
  
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
  
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

findCity("Paris");
displayForecast();