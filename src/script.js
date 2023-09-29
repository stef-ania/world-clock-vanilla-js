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

  //Nairobi
  let nairobiElement = document.querySelector("#nairobi");

  let nairobiDateElement = nairobiElement.querySelector(".date");
  let nairobiTimeElement = nairobiElement.querySelector(".time");

  let nairobiTime = moment().tz("Africa/Nairobi");

  nairobiDateElement.innerHTML = nairobiTime.format("MMMM Do YYYY");
  nairobiTimeElement.innerHTML = nairobiTime.format("hh:mm:ss [<small>]A[</small>]");

  //Tahiti
  let tahitiElement = document.querySelector("#tahiti");

  let tahitiDateElement = tahitiElement.querySelector(".date");
  let tahitiTimeElement = tahitiElement.querySelector(".time");

  let tahitiTime = moment().tz("Pacific/Tahiti");

  tahitiDateElement.innerHTML = tahitiTime.format("MMMM Do YYYY");
  tahitiTimeElement.innerHTML = tahitiTime.format("hh:mm:ss [<small>]A[</small>]");
}

updateTime();
setInterval(updateTime, 1000);

let cityTimeZone = null;

// Create an object with the path of the SVG images
const svgImages = {
  sunrise: "img/sunrise.svg",
  morning: "img/morning.svg",
  sunset: "img/sunset.svg",
  night: "img/night.svg",
};

// Function to update the city information
function updateCityInfo(cityTimeZone) {
  const cityTime = moment().tz(cityTimeZone);
  const cityName = cityTimeZone.replace("_", " ").split("/")[1];
  const cityDateFormat = cityTime.format("MMMM Do YYYY");
  const cityTimeFormat = cityTime.format("hh:mm:ss");
  const cityTimeFormatA = cityTime.format("A");

  // Determine the time period based on the AM/PM format and hour
  const isAM = cityTimeFormatA.toLowerCase() === "am";
  const hours = cityTime.hours();

  const timePeriod =
    isAM && hours >= 0 && hours < 5
      ? "night"
      : isAM && hours >= 5 && hours < 7
      ? "sunrise"
      : isAM && hours >= 7 && hours < 12
      ? "morning"
      : !isAM && hours >= 12 && hours < 17
      ? "morning"
      : !isAM && hours >= 17 && hours < 21
      ? "sunset"
      : !isAM && hours >= 21 && hours < 24
      ? "night"
      : "night"; // Default to "night" for any other cases

  return {
    cityName,
    cityDateFormat,
    cityTimeFormat,
    cityTimeFormatA,
    timePeriod, // Add the time period to the returned object
  };
}

// Function to update the HTML content with city information
function updateHTML(cityInfo) {
  const citiesElement = document.querySelector("#cities");
  const svgContainer = document.querySelector(".svg-container > img");

  const cityHTML = `
    <div class="svg-container">
        <img src="${svgImages[cityInfo.timePeriod]}" alt="${cityInfo.timePeriod}" class="SVG-time-of-day" />
    </div>
    <article class="city">
      <div>
        <h2>${cityInfo.cityName}</h2>
        <div class="date">${cityInfo.cityDateFormat}</div>
      </div>
      <div class="time">${cityInfo.cityTimeFormat} <small>${cityInfo.cityTimeFormatA}</small></div>
    </article>
    <div class="back-link-container"><a href="/" class="back-link">Back to previous cities </a></div>
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
