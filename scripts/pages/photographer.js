import { getPhotographers } from "../utils/getPhotographer.js";
import { photographerInformationsTemplate } from "../templates/photographerInformationsTemplate.js";

async function displayPhotographer() {
  const { photographers } = await getPhotographers();

  const currentUrl = new URLSearchParams(window.location.search);
  const photographerIdToDisplay = currentUrl.get("id");

  const main = document.getElementById("main");
  const photographerInformations = document.getElementsByClassName("photographer-presentation")[0];

  const errorWrapper = document.createElement("div");
  errorWrapper.classList.add("error-wrapper");

  const error = document.createElement("p");
  error.textContent = "Oups, il semble y avoir une erreur.";
  error.classList.add("error");

  const redirection = document.createElement("a");
  redirection.textContent = "Retourner sur la page d'accueil";
  redirection.setAttribute("href", "index.html");
  redirection.classList.add("redirection-link");
  redirection.setAttribute("role", "link");
  redirection.setAttribute("aria-label", "navigation principale");

  main.appendChild(errorWrapper);
  errorWrapper.appendChild(error);
  errorWrapper.appendChild(redirection);

  let choosenPhotographer = null;
  let isIdExisting = false;

  photographers.forEach((photographer) => {
    if (photographer.id === Number(photographerIdToDisplay)) {
      isIdExisting = true;
    }
  });

  isIdExisting && photographerIdToDisplay
    ? (choosenPhotographer = photographers.find(
        (photographer) => photographer.id === Number(photographerIdToDisplay)
      ))
    : (errorWrapper.style.display = "block") && (photographerInformations.style.display = "none");

  if (!choosenPhotographer) {
    return;
  }

  const photographerModel = photographerInformationsTemplate(choosenPhotographer);
  const photographerInformationsCard = photographerModel.setPhotographerCard();
  return photographerInformationsCard;
}

async function init() {
  displayPhotographer();
}

init();
