const page = document.querySelector("#content");
const header = document.createElement("div");
header.classList.add("header");
const mid = document.createElement("div");
mid.classList.add("mid");
const footer = document.createElement("footer");
footer.classList.add("footer");
footer.textContent = "Property of Darren Le";

function addContent() {
  // Key parameters
  let unit = "metric";
  let city = "New York"; // Default city
  const defaultParameters = getCurrWeather(city);
  // Header content
  const title = document.createElement("button");
  title.classList.add("title");
  title.textContent = "Weather";
  title.addEventListener("click", () => {
    location.reload();
  });
  const form = document.createElement("form");
  form.setAttribute("onSubmit", "return false");
  const searchBar = document.createElement("input");
  searchBar.setAttribute("type", "text");
  searchBar.setAttribute("id", "search");
  searchBar.setAttribute("placeholder", "Enter a city's name");
  // Get input when pressing Enter
  searchBar.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchBtn.click();
    }
  });
  // Search Button
  const searchBtn = document.createElement("button");
  searchBtn.setAttribute("type", "button");
  searchBtn.classList.add("submit");
  searchBtn.textContent = "Search";
  // API call when clicking "Search"
  searchBtn.addEventListener("click", () => {
    city = searchBar.value.trim();
    const parameters = getCurrWeather(city);
  });

  // Get Current Weather
  async function getCurrWeather(city) {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3c7c1bc590b5e8c9c8da6b6aa6ce7c7&units=metric`,
      { mode: "cors" }
    );
    // Error display
    if (response.status === 400) {
      throwErrorMsg();
    } else {
      // Get weather data in JSON format
      const res = await response.json();
      console.log(res);
      form.reset();
      const parameters = processData(res);
      return parameters;
    }
  }

  // Function: Process API-called data
  function processData(data) {
    const parameters = [];
    // Extract weather data from the JSON
    const name = data.name;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const temp_max = data.main.temp_max;
    const temp_min = data.main.temp_min;
    const wind = data.wind.speed;
    const visibility = data.visibility;
    const condition = data.weather[0].main;
    const description = data.weather[0].description;
    parameters.push(name);
    parameters.push(temp);
    parameters.push(humidity);
    parameters.push(temp_max);
    parameters.push(temp_min);
    parameters.push(wind);
    parameters.push(visibility);
    parameters.push(condition);
    parameters.push(description);
    // Test print
    console.log("Location: " + name);
    console.log("OVERALL: " + condition);
    console.log("DESCRIPTION: " + description);
    console.log("Temperature (C): " + temp);
    console.log("Humidity (%): " + humidity);
    console.log("Highest Temperature: " + temp_max);
    console.log("Lowest Temperature: " + temp_min);
    console.log("Wind speed (m/s): " + wind);
    console.log("Visibility (m): " + visibility);
    return parameters;
  }

  // MAIN content
  const forecast = document.createElement("div");
  forecast.classList.add("forecast");
  const cityName = document.createElement("p");
  cityName.classList.add("cityName");
  cityName.textContent = city;
  const info = document.createElement("div");
  const units = document.createElement("div");

  function FtoC(num) {
    const convertedTemp = ((num - 32) * 5) / 9;
    return convertedTemp;
  }

  function CtoF(num) {
    const convertedTemp = (num * 9) / 5 + 32;
    return convertedTemp;
  }

  // UI
  page.appendChild(header);
  header.appendChild(title);
  form.appendChild(searchBar);
  form.appendChild(searchBtn);
  header.appendChild(form);
  page.appendChild(mid);
  mid.appendChild(forecast);
  forecast.appendChild(cityName);
  forecast.appendChild(info);
  forecast.appendChild(units);
  page.appendChild(footer);
}

export default addContent;
