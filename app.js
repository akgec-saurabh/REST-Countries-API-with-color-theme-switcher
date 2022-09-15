"use strict";
console.log("Connected");

const containerElement = document.querySelector(".container");
const region = document.querySelector("#region");
const serach = document.querySelector("#search");

//! Light Mode
const light = document.querySelector(".dark-mode");
const lightIcon = document.querySelector("#light");

if (localStorage.getItem("dark") !== null) {
  document.body.classList.toggle("darker");
  lightIcon.classList.toggle("dark-icon");
}

light.addEventListener("click", function () {
  document.body.classList.toggle("darker");
  lightIcon.classList.toggle("dark-icon");
  if (localStorage.getItem("dark") === null)
    localStorage.setItem("dark", "yes");
  else localStorage.removeItem("dark");
});

const renderCountry = function (country, i) {
  const html = `
  <div class="country-name code${i}">
  <img src="${country.flags.svg}" alt="flag" class="flag" />
  <div class="detail">
    <h2>${country.name.common}</h2>
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

region.addEventListener("change", function (e) {
  const selRegion = e.target.value;
  //https://restcountries.com/v3.1/region/europe
  fetch(`https://restcountries.com/v3.1/region/${selRegion}`)
    .then((response) => response.json())
    .then((response) => response)
    .then((res) => {
      console.log("------fetching from api------");

      // emtying container element
      containerElement.innerHTML = "";

      res.forEach((element, i) => {
        // clear container
        renderCountry(element, i);
        console.log(element.name.common);
      });
      console.log(res);
      // localStorage.setItem("all", JSON.stringify(res));
    });
});

serach.addEventListener("search", function (e) {
  console.log("Serched");
  const serach = e.target.value;
  console.log("se=>" + serach);
  //https://restcountries.com/v3.1/name/peru
  if (serach !== "") {
    fetch(`https://restcountries.com/v3.1/name/${serach}`)
      .then((response) => response.json())
      .then((response) => response)
      .then((res) => {
        console.log("------fetching from api------");

        // emtying container element
        containerElement.innerHTML = "";

        res.forEach((element, i) => {
          // clear container
          renderCountry(element, i);
          console.log(element.name.common);
        });
        console.log(res);
        // localStorage.setItem("all", JSON.stringify(res));
      });
  } else {
    containerElement.innerHTML = "";
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
  }
});
