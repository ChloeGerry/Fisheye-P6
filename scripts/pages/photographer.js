import { getPhotographers } from "./home.js";
import { photographerInformationsTemplate } from "../templates/photographerInformationsTemplate.js";

async function displayPhotographer() {
  const { photographers } = await getPhotographers();
  const photographerId = localStorage.getItem("photographerId");
  let choosenPhotographer = [];

  photographers.find((photographer) => {
    return photographer.id === Number(photographerId) && choosenPhotographer.push(photographer);
  });

  const photographerModel = photographerInformationsTemplate(choosenPhotographer[0]);
  const photographerInformationsCard = photographerModel.setPhotographerCard();
  return photographerInformationsCard;
}

async function init() {
  displayPhotographer();
}

init();
