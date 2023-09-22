function updateTime() {
  //Rome
  let romeElement = document.querySelector("#rome");
  let romeDateElement = romeElement.querySelector(".date");
  let romeTimeElement = romeElement.querySelector(".time");

  let romeTime = moment().tz("Europe/Rome");

  romeDateElement.innerHTML = romeTime.format("MMMM Do YYYY");
  romeTimeElement.innerHTML = romeTime.format("hh:mm:ss [<small>]A[</small>]");
}

updateTime();
setInterval(updateTime, 1000);

function showCitySelected(event) {
  let cityTimeZone = event.target.value;
  let cityTime = moment().tz(cityTimeZone);
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityDateFormat = cityTime.format("MMMM Do YYYY");
  let cityTimeFormat = cityTime.format("hh:mm:ss");
  let cityTimeFormatA = cityTime.format("A");
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = ` <article class="city"> <div> <h2>${cityName}</h2> <div class="date">${cityDateFormat}</div> </div> <div class="time">${cityTimeFormat} <small>${cityTimeFormatA}</small></div> </article> `;
}

let selectCity = document.querySelector("#select-city");
selectCity.addEventListener("change", showCitySelected);
