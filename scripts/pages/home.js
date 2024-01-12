import { photographerTemplate } from "../templates/photographerTemplate.js";
import { getPhotographers } from "../utils/getPhotographer.js";

async function displayPhotographers(photographers) {
  const photographersSection = document.getElementsByClassName("photographer-wrapper")[0];

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.setPhotographersCards();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const main = document.getElementById("main");

  const errorWrapper = document.createElement("div");
  errorWrapper.classList.add("error-wrapper");

  const error = document.createElement("p");
  error.textContent = "Oups, il semble y avoir une erreur.";
  error.classList.add("error");

  main.appendChild(errorWrapper);
  errorWrapper.appendChild(error);

  const { photographers } = await getPhotographers();

  if (!photographers) {
    errorWrapper.style.display = "block";
  } else {
    displayPhotographers(photographers);
  }
}

init();
