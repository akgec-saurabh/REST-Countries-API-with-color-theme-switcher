"use strict";
console.log("Connected");

const containerElement = document.querySelector(".container");

function hideNow() {
  const farray = document.querySelectorAll(".country-name");
  for (let el of farray) {
    el.style.display = "none";
  }

  const html = `<div class="new-container">
          <div class="button">back</div>

          <div class="container-next">
            <img
              src="https://flagcdn.com/fi.svg"
              alt="flag"
              class="flag-image half"
            />
            <div class="detail-country half">
              <h2 class="country">Country</h2>
              <div class="details-half">
                <div class="one">
                  <ul>
                    <li>Native Name :&nbsp;<span></span></li>
                    <li>Population :&nbsp;<span></span></li>
                    <li>Region :&nbsp;<span></span></li>
                    <li>Sub Region :&nbsp;<span></span></li>
                    <li>Capital :&nbsp;<span></span></li>
                  </ul>
                </div>
                <div class="two">
                  <ul>
                    <li>Top Level Domain :&nbsp;<span></span></li>
                    <li>Currencies :&nbsp;<span></span></li>
                    <li>Languages :&nbsp;<span></span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>`;

  containerElement.insertAdjacentHTML("beforeend", html);
}

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

  countryElement.addEventListener("click", hideNow);
};

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((response) => response)
  .then((res) => {
    res.forEach((element, i) => {
      renderCountry(element, i);
    });
    console.log(res);
  });
