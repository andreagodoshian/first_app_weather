function formatDate(timestamp) {
  let now = new Date(timestamp);

  let date = now.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  let year = now.getFullYear();

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${date} ${month} ${year}, at ${hours}:${minutes}`;
}

function sunTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayWeatherConditions(response) {
  console.log(response.data);

  defaultTemp = response.data.main.temp;

  document.querySelector("h4").innerHTML = response.data.name;
  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#current-icon")
    .setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#current-condition").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#sunrise").innerHTML = sunTime(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = sunTime(
    response.data.sys.sunset * 1000
  );
}

// START HERE - since this is all search based, call Open Weather first
function callOpenWeather(city) {
  // DON'T FORGET TO INSTALL AXIOS!!!!!!!
  let openWeatherKey = "54061155f51c8e7d4989e763fe60a16c";
  let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherKey}&units=metric`;
  axios.get(openWeatherUrl).then(displayWeatherConditions);
}

function chooseCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  callOpenWeather(city);
}

function searchLocation(position) {
  let openWeatherKey = "54061155f51c8e7d4989e763fe60a16c";
  let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${openWeatherKey}&units=metric`;

  axios.get(openWeatherUrl).then(displayWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showTempInF(event) {
  event.preventDefault();
  let convertToF = (defaultTemp * 9) / 5 + 32;
  document.querySelector("#current-temp").innerHTML = Math.round(convertToF);
}

function showTempInC(event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML = Math.round(defaultTemp);
}

let defaultTemp = null;

let tempInF = document.querySelector("#f-link");
tempInF.addEventListener("click", showTempInF);

let tempInC = document.querySelector("#c-link");
tempInC.addEventListener("click", showTempInC);

let searchForm = document.querySelector("#city-searchbar");
searchForm.addEventListener("submit", chooseCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

callOpenWeather("Yakutsk");
