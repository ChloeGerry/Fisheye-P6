import { getPhotographers } from "../utils/getPhotographer.js";
import { photographerInformationsTemplate } from "../templates/photographerInformationsTemplate.js";
import { HandleFormClass } from "../utils/HandleFormClass.js";
import { getMedia } from "../utils/getMedia.js";
import { mediaCard } from "../factories/MediaFactory.js";
import { PhotographerErrorMessage } from "../utils/ErrorMessageClass.js";
import { mediaTemplate } from "../templates/mediaTemplate.js";
import { setFilteredMedias } from "../utils/filteredMedias.js";

async function displayPhotographer() {
  const { photographers } = await getPhotographers();

  const currentUrl = new URLSearchParams(window.location.search);
  const photographerIdToDisplay = currentUrl.get("id");

  const errorMessage = new PhotographerErrorMessage();

  let choosenPhotographer = null;
  let isIdExisting = false;

  const photographerInformations = document.getElementsByClassName("photographer-presentation")[0];
  if (!photographers || photographers.length === 0) {
    errorMessage.displayErrorMessage();
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
    errorMessage.displayErrorMessage();
    photographerInformations.style.display = "none";
  }

  if (!choosenPhotographer) {
    return;
  }

  const photographerModel = photographerInformationsTemplate(choosenPhotographer);
  const photographerInformationsCard = photographerModel.setPhotographerCard();

  const modalForm = new HandleFormClass();
  modalForm.handleModal();
  modalForm.handleForm(photographerName);
  return photographerInformationsCard;
}

const displayMedia = async () => {
  const { medias } = await getMedia();

  if (!medias || medias.length === 0) {
    return;
  }

  const photographerMedias = [];

  if (medias) {
    const currentUrl = new URLSearchParams(window.location.search);
    const photographerId = currentUrl.get("id");

    medias.find((media) => {
      if (media.photographerId === Number(photographerId)) {
        const photographerMedia = mediaCard({
          title: `${media.title}`,
          likes: `${media.likes}`,
          photographerId: `${media.photographerId}`,
          mediaFile: `${media.video ? media.video : media.image}`,
          date: `${media.date}`,
        });

        photographerMedias.push(photographerMedia);

        const mediasWrapper = document.getElementsByClassName("medias-wrapper")[0];
        const mediaModel = mediaTemplate(photographerMedia);
        mediasWrapper.appendChild(mediaModel);
      }
    });

    setFilteredMedias(photographerMedias);
  }
};

async function init() {
  displayPhotographer();
  displayMedia();
}

init();
