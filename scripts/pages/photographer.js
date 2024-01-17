import { getPhotographers } from "../utils/getPhotographer.js";
import { photographerInformationsTemplate } from "../templates/photographerInformationsTemplate.js";
import { HandleFormClass } from "../utils/HandleFormClass.js";
import { sendNotification } from "../utils/notification.js";

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

  if (!photographers || photographers.length === 0) {
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

  if (isIdExisting && photographerIdToDisplay) {
    choosenPhotographer = photographers.find(
      (photographer) => photographer.id === Number(photographerIdToDisplay)
    );
    photographerName = choosenPhotographer.name;
  } else {
    errorWrapper.style.display = "block";
    photographerInformations.style.display = "none";
  }

  if (!choosenPhotographer) {
    return;
  }

  const photographerModel = photographerInformationsTemplate(choosenPhotographer);
  const photographerInformationsCard = photographerModel.setPhotographerCard();
  handleModal();
  handleForm(photographerName);
  return photographerInformationsCard;
}

async function handleModal() {
  const openFormButton = document.getElementsByClassName("contact-button")[0];
  const formClass = new HandleFormClass();
  openFormButton.addEventListener("click", () => {
    const formFields = formClass.getFormFields();
    formClass.displayModal();

    formFields.forEach((field) => {
      field.messageNode.setAttribute("data-error-visible", "false");
      field.accessibilityMessage.setAttribute("aria-invalid", "false");
    });
  });

  const closeIcon = document.getElementsByClassName("close-icon")[0];
  closeIcon.addEventListener("click", formClass.closeModal);

  closeIcon.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      formClass.closeModal();
    }
  });

  const modal = document.getElementById("contact-modal");
  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      formClass.closeModal();
    }
  });
}

const form = document.getElementsByClassName("form-wrapper")[0];

const validate = () => {
  const formClass = new HandleFormClass();
  const formFields = formClass.getFormFields();
  let areAllFieldsValids = true;

  formFields.forEach((field) => {
    field.messageNode.setAttribute("data-error-visible", field.isInvalid ? "true" : "false");
    field.accessibilityMessage.setAttribute("aria-invalid", field.isInvalid ? "true" : "false");

    if (field.isInvalid) {
      areAllFieldsValids = false;
      return;
    }
  });

  if (areAllFieldsValids) {
    formFields.forEach((field) => {
      console.log(field.fieldName, field.value);
    });

    form.reset();
    formClass.closeModal();
    sendNotification();
  }
};

async function handleForm(photographerName) {
  const formTitle = document.getElementsByClassName("modal-title_photographer")[0];
  formTitle.textContent = ` ${photographerName}`;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    validate();
  });
}

async function init() {
  displayPhotographer();
}

init();
