let apiKey = "e9e91b2ff3ef4ee9f513c835d919042a";
let temperatureElement = document.querySelector("#temperature");
let heading = document.querySelector("h1");
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let position = input.value || response.data.name;
  temperatureElement.innerHTML = `It is ${temperature} °C in ${position}`;
  heading.innerHTML = input.value || response.data.name;
}
function showPosition(position) {
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    input.value +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then(showTemperature);
}
function showCurrentPosition(position) {
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    position.coords.latitude +
    "&lon=" +
    position.coords.longitude +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then(showTemperature);
}

let button = document.querySelector("#searchCityButton");
let currentLocationButton = document.querySelector("#currentLocationButton");
let time = document.querySelector(".time");
let input = document.querySelector("#city-input");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let minutes = now.getMinutes();
let hour = now.getHours();
let formatDate = function (now) {
  return `${day} ${hour} ${minutes} `;
};

let updateCity = function () {
  temperatureElement.innerHTML = "We're working on your request";
  time.innerHTML = formatDate(now);
  showPosition(input.value);
};

let updateCurrentCity = function () {
  temperatureElement.innerHTML = "We're working on your request";
  input.value = null;
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
};
button.addEventListener("click", updateCity);
currentLocationButton.addEventListener("click", updateCurrentCity);
