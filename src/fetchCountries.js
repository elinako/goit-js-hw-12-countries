import templateOne from "./templateOne.hbs";
import { alert, notice, info, success, error } from "@pnotify/core";
import { defaults } from "@pnotify/core";
defaults.width = "500px";
defaults.height = "50px";

const countryBlock = document.querySelector(".country-block");
const oneCountryBlock = document.querySelector(".one-country-block");
const errorBlock = document.querySelector(".error");

const inputElement = document.querySelector("#input");

function fetchCountries(event) {
  const country = event.target.value;

  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let arrayOfCountries = data.length;
      if (arrayOfCountries < 10 && arrayOfCountries > 2) {
        const markupSome = data.map((item) => `<li>${item.name}</li>`);
        const joinedMarkup = markupSome.join("");
        countryBlock.insertAdjacentHTML("beforeend", joinedMarkup);
        countryBlock.classList.remove("hidden");
      } else if (arrayOfCountries === 1) {
        console.log(data);
        const markupOne = data.map((item) => templateOne(item));
        oneCountryBlock.insertAdjacentHTML("beforeend", markupOne);
        countryBlock.classList.add("hidden");
      } else if (data.length > 10) {
        const myError = error({
          text: "Too many matches found. Please enter a more specific query.",
          type: "notice",
          labels: { close: "Close" },
          remove: true,
        });
      }
    })
    .catch((error) => console.log(error));
}

inputElement.addEventListener("input", _.debounce(fetchCountries, 500));
