function formatDate(timeTemp) {
  let now = new Date(timeTemp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  let hours = now.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

//part 4
function forecastDay(dailyStamp) {
  let date = new Date(dailyStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forcast = response.data.daily;
  let forecastElement = document.querySelector(".container-week");
  forecastElement.innerHTML = "";
  let forecastHTML = `<div class="row">`;
  //
  forcast.forEach(function (forcastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="card" style="width: 5rem">
          <p class="card-text">${forecastDay(forcastDay.dt)}</p>
          
            <img src="http://openweathermap.org/img/wn/${
              forcastDay.weather[0].icon
            }@2x.png" />
          
          <div class="card-body">
            <p class="card-text">
              ${Math.round(forcastDay.temp.max)}° <br />
              <span class="temperature-day-min">${Math.round(
                forcastDay.temp.min
              )}°</span>
            </p>
          </div>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  let temperatureCelsius = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = temperatureCelsius;

  let humidity = Math.round(response.data.main.humidity);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = humidity;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = wind;

  let weather = response.data.weather[0].description;
  let currentWeather = document.querySelector("#weather");
  currentWeather.innerHTML = weather;

  let currentCity = document.querySelector("h1");
  let city = response.data.name;
  currentCity.innerHTML = city;

  let timeDate = response.data.dt;

  let time = document.querySelector("#currentTime");
  time.innerHTML = `Last updated: ${formatDate(timeDate * 1000)}`;

  let iconUrl = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  let icon = document.querySelector("#mainIcon");
  icon.setAttribute("src", iconUrl);
  icon.setAttribute("alt", response.data.weather[0].main);
  currentLocation(response.data.coord);
}

function search(city) {
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function city(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityName");

  search(cityName.value);
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", city);

function currentLocation(position) {
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.lat}&lon=${position.lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(displayForecast);
}

search("Kharkiv");
