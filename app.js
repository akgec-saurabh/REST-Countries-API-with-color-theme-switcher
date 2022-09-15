"use strict";
console.log("Connected");

const containerElement = document.querySelector(".container");

const renderCountry = function (country, i) {
  const html = `
  <div class="country-name code${i}">
  <img src="${country.flags.svg}" alt="flag" class="flag" />
  <div class="detail">
    <h2>${country.name.official}</h2>
    <ul>
      <li>Population : &nbsp;<span>${country.population.toLocaleString(
        "en-US"
      )}</span></li>
      <li>Region : &nbsp<span>${country.region}</span></li>
      <li>Capital : &nbsp<span>${country.capital}</span></li>
    </ul>
  </div>
  </div>

    `;

  containerElement.insertAdjacentHTML("beforeend", html);

  const countryElement = document.querySelector(`.code${i}`);

  countryElement.addEventListener("click", function () {
    // open new html page of details
    window.open("./detail.html", "_self");
    // save the current selected country to the local storage
    localStorage.setItem("current", JSON.stringify(country));
  });
};

// if data of all country present in local storage use from there else
// fetch and store to local storage
if (localStorage.getItem("all") === null) {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((response) => response)
    .then((res) => {
      console.log("------fetching from api------");
      res.forEach((element, i) => {
        renderCountry(element, i);
      });
      console.log(res);
      localStorage.setItem("all", JSON.stringify(res));
    });
} else {
  const res = JSON.parse(localStorage.getItem("all"));
  // reading from local storage
  console.log("------reading from local storage------");
  console.log(res);
  res.forEach((element, i) => {
    renderCountry(element, i);
  });
}
