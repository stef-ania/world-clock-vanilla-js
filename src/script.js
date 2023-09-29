function updateTime() {
  //Rome
  let romeElement = document.querySelector("#rome");

  //With this "if" this element appears just if Rome is displayed
  if (romeElement) {
    let romeDateElement = romeElement.querySelector(".date");
    let romeTimeElement = romeElement.querySelector(".time");

    let romeTime = moment().tz("Europe/Rome");

    romeDateElement.innerHTML = romeTime.format("MMMM Do YYYY");
    romeTimeElement.innerHTML = romeTime.format("hh:mm:ss [<small>]A[</small>]");
  }
}

updateTime();
setInterval(updateTime, 1000);

let cityTimeZone = null;

// Function to update the city information
function updateCityInfo(cityTimeZone) {
  const cityTime = moment().tz(cityTimeZone);
  const cityName = cityTimeZone.replace("_", " ").split("/")[1];
  const cityDateFormat = cityTime.format("MMMM Do YYYY");
  const cityTimeFormat = cityTime.format("hh:mm:ss");
  const cityTimeFormatA = cityTime.format("A");

  return {
    cityName,
    cityDateFormat,
    cityTimeFormat,
    cityTimeFormatA,
  };
}

// Function to update the HTML content with city information
function updateHTML(cityInfo) {
  const citiesElement = document.querySelector("#cities");
  const cityHTML = `
    <div class="svg-container">
        <img src="" alt="" id="SVG-img" />
    </div>
    <article class="city">
      <div>
        <h2>${cityInfo.cityName}</h2>
        <div class="date">${cityInfo.cityDateFormat}</div>
      </div>
      <div class="time">${cityInfo.cityTimeFormat} <small>${cityInfo.cityTimeFormatA}</small></div>
    </article>
  `;
  citiesElement.innerHTML = cityHTML;
}

// Function to handle city selection
function handleCitySelection(event) {
  const newCityTimeZone = event.target.value;

  if (newCityTimeZone === "Select a city...") {
    // Handle the case when "Select a city..." is chosen
    const citiesElement = document.querySelector("#cities");
    citiesElement.innerHTML = "Please select a city...";
    return;
  }

  if (newCityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  } else {
    cityTimeZone = newCityTimeZone;
  }

  // Update the city information and HTML content
  const cityInfo = updateCityInfo(cityTimeZone);
  updateHTML(cityInfo);

  // Set up an interval to update the time every second
  setInterval(() => {
    const cityInfo = updateCityInfo(cityTimeZone);
    updateHTML(cityInfo);
  }, 1000);
}

// Add event listener for city selection
const selectCity = document.querySelector("#select-city");
selectCity.addEventListener("change", handleCitySelection);

function updateCitySVG() {
  //let currentTimeSVG = document.querySelector("#current-time-SVG");
  //currentTimeSVG.setAttribute("src", `img/${}.svg`);

  const time = document.querySelector(".time");

  if (time > "00:00:00 <small>AM</small>" && time < "11:59:59 <small>AM</small>") {
    document.getElementById("SVG-img").src = "img/morning.svg";
  } else {
    document.getElementById("SVG-img").src = "img/night.svg";
  }

  // Display the SVG content
  let svgContainer = document.querySelector("#svg-container");
  svgContainer.style.display = "block";
}
