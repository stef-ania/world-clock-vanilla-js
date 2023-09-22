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

let cityTimeZone = null; // Initialize the selected cityTimeZone as null

function showCitySelected(event) {
  let newCityTimeZone = event.target.value;

  // Check if a valid city option is selected
  if (newCityTimeZone !== "Select a city...") {
    if (newCityTimeZone === "current") {
      newCityTimeZone = moment.tz.guess();
    }

    // Only update the selected city if it has changed
    if (newCityTimeZone !== cityTimeZone) {
      cityTimeZone = newCityTimeZone;

      let citiesElement = document.querySelector("#cities");

      // Function to update the time
      function updateCityTime() {
        let cityTime = moment().tz(cityTimeZone);
        let cityName = cityTimeZone.replace("_", " ").split("/")[1];
        let cityDateFormat = cityTime.format("MMMM Do YYYY");
        let cityTimeFormat = cityTime.format("hh:mm:ss");
        let cityTimeFormatA = cityTime.format("A");

        // Create the HTML for the selected city
        let cityHTML = `
          <article class="city">
            <div>
              <h2>${cityName}</h2>
              <div class="date">${cityDateFormat}</div>
            </div>
            <div class="time">${cityTimeFormat} <small>${cityTimeFormatA}</small></div>
          </article>
        `;

        // Update the content of the citiesElement without replacing it
        citiesElement.innerHTML = cityHTML;
      }

      // Call the update function initially and then set up an interval
      updateCityTime();
      setInterval(updateCityTime, 1000);
    }
  } else {
    // Handle the case when "Select a city..." is chosen
    // You can clear the city information or display a message as needed
    let citiesElement = document.querySelector("#cities");
    citiesElement.innerHTML = "Please select a city...";
  }
}

let selectCity = document.querySelector("#select-city");
selectCity.addEventListener("change", showCitySelected);
