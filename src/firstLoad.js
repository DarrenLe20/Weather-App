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
  let parameters = [];
  let unit = "C";
  let city = "New York"; // Default city
  getCurrWeather(city);
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
  const error = document.createElement("span");
  error.classList.add("error");
  // Search Button
  const searchBtn = document.createElement("button");
  searchBtn.setAttribute("type", "button");
  searchBtn.classList.add("submit");
  searchBtn.textContent = "Search";
  // API call when clicking "Search"
  searchBtn.addEventListener("click", () => {
    city = searchBar.value.trim();
    parameters = getCurrWeather(city);
  });

  // Get Current Weather
  async function getCurrWeather(city) {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3c7c1bc590b5e8c9c8da6b6aa6ce7c7&units=metric`,
        { mode: "cors" }
      );
      // Error display
      error.style.display = "none";
      // Get weather data in JSON format
      const res = await response.json();
      console.log(res);
      form.reset();
      const data = processData(res);
      clearPage();
      displayContent(data);
    } catch (e) {
      // Display error
      error.style.display = "block";
      error.textContent = "City not found. Please try again!";
      form.reset();
    }
  }

  // Function: Process API-called data
  function processData(data) {
    parameters = [];
    // Extract weather data from the JSON
    parameters.push(data.name); //0
    parameters.push(data.main.temp); //1
    parameters.push(data.main.feels_like); //2
    parameters.push(data.main.humidity); //3
    parameters.push(data.main.temp_max); //4
    parameters.push(data.main.temp_min); //5
    parameters.push(data.wind.speed); //6
    parameters.push(data.visibility); //7
    parameters.push(data.weather[0].main); //8
    parameters.push(data.weather[0].description); //9
    return parameters;
  }

  function clearPage() {
    while (mid.firstChild) {
      mid.removeChild(mid.firstChild);
    }
  }

  function displayContent(data) {
    // MAIN content
    const forecast = document.createElement("div");
    forecast.classList.add("forecast");
    const cityName = document.createElement("p");
    cityName.classList.add("cityName");
    cityName.textContent = city;
    // Display Info
    const main = document.createElement("div");
    main.classList.add("main");
    const temperature = document.createElement("div");
    temperature.classList.add("temp");
    temperature.textContent = data[1] + "°";

    const overall = document.createElement("div");
    overall.classList.add("overall");
    const sky = document.createElement("div");
    sky.classList.add("sky");
    sky.textContent = data[8];
    const details = document.createElement("div");
    details.classList.add("details");
    details.textContent = data[9];

    const others = document.createElement("div");
    others.classList.add("others");
    const feels = document.createElement("div");
    const a = document.createElement("p");
    a.classList.add("category");
    a.textContent = "Feels like";
    feels.appendChild(a);
    const num1 = document.createElement("p");
    num1.textContent = parameters[2];
    feels.appendChild(num1);

    const humidity = document.createElement("div");
    const b = document.createElement("p");
    b.classList.add("category");
    b.textContent = "Humidity";
    humidity.appendChild(b);
    const num2 = document.createElement("p");
    num2.textContent = parameters[3];
    humidity.appendChild(num2);

    const max = document.createElement("div");
    const c = document.createElement("p");
    c.classList.add("category");
    c.textContent = "MAX temp";
    max.appendChild(c);
    const num3 = document.createElement("p");
    num3.textContent = parameters[4];
    max.appendChild(num3);

    const min = document.createElement("div");
    const d = document.createElement("p");
    d.classList.add("category");
    d.textContent = "MIN temp";
    min.appendChild(d);
    const num4 = document.createElement("p");
    num4.textContent = parameters[5];
    min.appendChild(num4);

    const wind = document.createElement("div");
    const e = document.createElement("p");
    e.classList.add("category");
    e.textContent = "Wind";
    wind.appendChild(e);
    const num5 = document.createElement("p");
    num5.textContent = parameters[6];
    wind.appendChild(num5);

    const visibility = document.createElement("div");
    const f = document.createElement("p");
    f.classList.add("category");
    f.textContent = "Visibility";
    visibility.appendChild(f);
    const num6 = document.createElement("p");
    num6.textContent = parameters[7];
    visibility.appendChild(num6);

    const info = document.createElement("div");
    const units = document.createElement("div");
    units.classList.add("units");
    const unitToggle = document.createElement("button");
    unitToggle.classList.add("unitToggle");
    unitToggle.textContent = "Change Unit: " + unit;
    // Change Unit: Metric - Imperial
    unitToggle.addEventListener("click", () => {
      if (unit === "C") {
        unit = "F";
        unitToggle.textContent = "Change Unit: " + unit;
      } else {
        unit = "C";
        unitToggle.textContent = "Change Unit: " + unit;
      }
    });

    // UI
    mid.appendChild(forecast);
    forecast.appendChild(cityName);
    forecast.appendChild(info);
    info.appendChild(main);
    main.appendChild(temperature);
    main.appendChild(overall);
    overall.appendChild(sky);
    overall.appendChild(details);
    info.appendChild(others);
    others.appendChild(feels);
    others.appendChild(humidity);
    others.appendChild(max);
    others.appendChild(min);
    others.appendChild(wind);
    others.appendChild(visibility);
    forecast.appendChild(units);
    units.appendChild(unitToggle);
  }

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
  form.appendChild(error);
  header.appendChild(form);
  page.appendChild(mid);

  page.appendChild(footer);
}

export default addContent;
