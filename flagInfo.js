// On Load
window.onload = () => {
  if (window.localStorage.theme == "dark") {
    document.body.classList.add("dark-mode-theme");
  } else {
    document.body.classList.remove("dark-mode-theme");
  }
};
// Start Dark Mode Swticher
let darkModeSwitcher = document.querySelectorAll(".dark-mode-switcher");
darkModeSwitcher.forEach((s) => {
  s.onclick = () => {
    document.body.classList.toggle("dark-mode-theme");
    darkModeSwitcher[0].classList.toggle("fa-regular");

    if (document.body.classList.contains("dark-mode-theme")) {
      window.localStorage.theme = "dark";
    } else {
      window.localStorage.theme = "light";
    }
  };
});
// End Dark Mode Swticher
// Setting the title to the selected country
document.title = `${localStorage.country} Info`;

//Start Creating the Page

let linkBack = document.querySelector("button");
linkBack.onclick = () => {
  window.history.back();
};

async function getAPI(api) {
  try {
    let country = (await (await fetch(api)).json())[0];
    console.log(country.borders == undefined);
    createFlagInfo(country);
  } catch (error) {
    console.log(error);
  }
}

getAPI(`https://restcountries.com/v3.1/name/${localStorage.country}`);

function createFlagInfo(country) {
  let img = document.querySelector(".flag img");
  img.src = country.flags.svg;
  img.alt = country.flags.alt;

  let h2 = document.querySelector(".text h2");
  h2.innerHTML = localStorage.country;

  let nativeName = document.querySelector("ul li:nth-child(1)");
  let subCountryName = Object.keys(country.name.nativeName)[0];
  nativeName.lastChild.innerHTML =
    country.name.nativeName[subCountryName].common;

  let population = document.querySelector("ul li:nth-child(2)");
  population.lastChild.innerHTML = country.population;

  let region = document.querySelector("ul li:nth-child(3)");
  region.lastChild.innerHTML = country.region;

  let subRegion = document.querySelector("ul li:nth-child(4)");
  subRegion.lastChild.innerHTML = country.subregion;

  let capital = document.querySelector("ul li:nth-child(5)");
  capital.lastChild.innerHTML = country.capital;

  let domain = document.querySelector("ul li:nth-child(6)");
  domain.lastChild.innerHTML = country.altSpellings[0];

  let currency = document.querySelector("ul li:nth-child(7)");
  let theCurrency = Object.keys(country.currencies)[0];
  currency.lastChild.innerHTML = theCurrency;

  let languages = document.querySelector("ul li:nth-child(8) div");
  let theLanguages = Object.keys(country.languages);

  for (let i = 0; i < theLanguages.length; i++) {
    let span = document.createElement("span");
    let countryName = document.createTextNode(
      country.languages[theLanguages[i]]
    );
    span.appendChild(countryName);
    languages.appendChild(span);
  }

  //Find the countries according to its sub names
  let countries = document.querySelector(".countries");
  let countryBorders = country.borders;

  fetch("https://restcountries.com/v3.1/all")
    .then((r) => r.json())
    .then((r) => {
      let allCountries = r;
      if (country.borders != undefined) {
        for (let i = 0; i < countryBorders.length; i++) {
          for (let j = 0; j < allCountries.length; j++) {
            if (allCountries[j].name.common.toLowerCase() == "israel") continue;
            if (allCountries[j].name.common.toLowerCase() == "palestine") {
              allCountries[j].name.common = "Free Palestine";
            }
            if (countryBorders[i] == allCountries[j].cca3) {
              let span = document.createElement("span");
              let countryBorder = document.createTextNode(
                allCountries[j].name.common
              );
              span.appendChild(countryBorder);
              countries.appendChild(span);
            }
          }
        }
      } else {
        countries.innerHTML = "No Borders"
      }
    });
}
