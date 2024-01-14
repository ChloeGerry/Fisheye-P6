import { getPhotographers } from "../utils/getPhotographer.js";
import { photographerInformationsTemplate } from "../templates/photographerInformationsTemplate.js";
import { HandleModalClass } from "../utils/contactForm.js";

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

  if (!photographers) {
    errorWrapper.style.display = "block";
    photographerInformations.style.display = "none";
  } else {
    photographers.forEach((photographer) => {
      if (photographer.id === Number(photographerIdToDisplay)) {
        isIdExisting = true;
      }
    });
  }

  let photographerName = null;

  isIdExisting && photographerIdToDisplay
    ? (choosenPhotographer = photographers.find(
        (photographer) =>
          (photographerName = photographer.name) &&
          photographer.id === Number(photographerIdToDisplay)
      ))
    : (errorWrapper.style.display = "block") && (photographerInformations.style.display = "none");

  if (!choosenPhotographer) {
    return;
  }

  const photographerModel = photographerInformationsTemplate(choosenPhotographer);
  const photographerInformationsCard = photographerModel.setPhotographerCard();
  handleModal(photographerName);
  return photographerInformationsCard;
}

async function handleModal(photographerName) {
  const openFormButton = document.getElementsByClassName("contact-button")[0];
  const modalClass = new HandleModalClass();
  openFormButton.addEventListener("click", modalClass.displayModal);

  const closeIcon = document.getElementsByClassName("close-icon")[0];
  closeIcon.addEventListener("click", modalClass.closeModal);

  closeIcon.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      modalClass.closeModal();
    }
  });

  const modal = document.getElementById("contact-modal");
  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modalClass.closeModal();
    }
  });
}

async function init() {
  displayPhotographer();
}

init();
