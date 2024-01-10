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
  const { photographers } = await getPhotographers();
  displayPhotographers(photographers);
}

init();
