import { photographerTemplate } from "../templates/photographerTemplate.js";

export async function getPhotographers() {
  try {
    const response = await fetch("http://127.0.0.1:5500/data/photographers.json");
    const data = await response.json();
    return {
      photographers: data.photographers,
    };
  } catch (error) {
    console.log("error", error);
  }
}

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

  function getPhotographerId(id) {
    localStorage.setItem("photographerId", id);
  }

  const photographerLink = document.getElementsByClassName("photographer-card");
  let isChoosenPhotographer = false;

  for (let i = 0; i < photographerLink.length; i++) {
    photographerLink[i].addEventListener("click", () => {
      photographers.find((photographer) => {
        const photographerPicture = document.getElementsByClassName("photographer-picture");
        photographer.name === photographerPicture[i].getAttribute("alt")
          ? (isChoosenPhotographer = true)
          : (isChoosenPhotographer = false);
        return isChoosenPhotographer && getPhotographerId(photographer.id);
      });
    });
  }
}

init();
