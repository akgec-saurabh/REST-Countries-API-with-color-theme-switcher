const flagImage = document.querySelector(".flag-image");
const country = document.querySelector(".country");

const nativeName = document.querySelector(".one > ul li:nth-of-type(1)>span");
const population = document.querySelector(".one > ul li:nth-of-type(2) > span");
const region = document.querySelector(".one > ul li:nth-of-type(3)>span");
const subregion = document.querySelector(".one > ul li:nth-of-type(4) span");
const capital = document.querySelector(".one > ul li:nth-of-type(5) span");

const tld = document.querySelector(".two > ul li:nth-of-type(1) span");
const currencies = document.querySelector(".two > ul li:nth-of-type(2) span");
const languages = document.querySelector(".two > ul li:nth-of-type(3) span");

const current = JSON.parse(localStorage.getItem("current"));
// if (localStorage.getItem("br") !== null)

const backbtn = document.querySelector(".button");

const borderElement = document.querySelector(".border-container");

function getCurrency(c) {
  let lang;
  for (let elm in c) {
    lang = c[elm];
  }
  return lang.name;
}

function getlang(c) {
  let lang = "";
  for (let elm in c) {
    if (lang != "") lang += ", " + c[elm];
    else lang = c[elm];
  }
  return lang;
}

flagImage.setAttribute("src", current.flags.svg);
country.textContent = current.name.common;

nativeName.textContent = current.name.official;
population.textContent = current.population;
region.textContent = current.region;
subregion.textContent = current.subregion;
capital.textContent = current.capital;

tld.textContent = current.tld;
currencies.textContent = getCurrency(current.currencies);
languages.textContent = getlang(current.languages);

backbtn.addEventListener("click", function () {
  localStorage.removeItem("current");
  window.open("./index.html", "_self");
});

// Getting borders

const border = current.borders;
console.log(border);

async function fetchbycca3(cca3) {
  const obj = fetch(`https://restcountries.com/v3.1/alpha/${cca3}`)
    .then((resolve) => resolve.json())
    .then((result) => {
      const [obj] = result;
      return obj;
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

  return obj;
}

border.forEach((br, i) => {
  fetchbycca3(br)
    .then((res) => {
      html = `
    <div class="borders ${"br" + i}">${res.name.common}</div>
    `;
      borderElement.insertAdjacentHTML("beforeend", html);
      document.querySelector(`.br${i}`).addEventListener("click", function () {
        // open new html page of details
        localStorage.removeItem("current");
        localStorage.setItem("current", JSON.stringify(res));
        window.open("./detail.html", "_self");
      });
    })

    .catch((er) => console.log(er));
});
