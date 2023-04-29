function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
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
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-status").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#time").innerHTML = formatDate(response.data.dt);
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}
  
function findCity(city) {
  let apiKey = "842b36d55cb28eba74a018029d56b04c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
  
function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let city = cityInput.toLowerCase();
  findCity(city);
}
  
let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", enterCity);
  
  
function showPosition(position) {
  let apiKey = "842b36d55cb28eba74a018029d56b04c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
  
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
  
let currentButton = document.querySelector("#current-button");
  currentButton.addEventListener("click", getCurrentLocation);
  