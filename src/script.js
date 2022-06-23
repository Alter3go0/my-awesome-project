//Display current day & time
let rightNow = new Date();
let h3 = document.querySelector("h3");
let hour = rightNow.getHours();
let minutes = rightNow.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[rightNow.getDay()];
h3.innerHTML = `${day} ${hour}:${minutes}`;

function getWeatherInfo(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let number = document.querySelector("#number");
  number.innerHTML = temperature;

  let description = document.querySelector("li#descrip");
  description.innerHTML = `${response.data.weather[0].main}!`;

  let humidity = document.querySelector("li#humid");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let wind = document.querySelector("li#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
}
//City Search & Temp
function searchCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let cityInput = document.querySelector("#search-text-input");
  let cityResult = `${cityInput.value}`;
  console.log(cityResult);
  h1.innerHTML = `${cityResult}`;

  let endPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "acf8858f892dd5b1dcacb16d02f5393a";
  let unit = "metric";
  let apiUrl = `${endPoint}?q=${cityResult}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(getWeatherInfo);
}
let form = document.querySelector("#city-search");
form.addEventListener("submit", searchCity);

//Current Location Button & Geolocation
function currentPosition(position) {
  console.log(position);
  alert(position.data.name);
}
let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", currentPosition);

function retrievePosition(position) {
  let apiKey = "acf8858f892dd5b1dcacb16d02f5393a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(currentPosition);
}
navigator.geolocation.getCurrentPosition(retrievePosition);
