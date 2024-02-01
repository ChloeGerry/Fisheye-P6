import { getPhotographers } from "../utils/getPhotographer.js";
import { photographerInformationsTemplate } from "../templates/photographerInformationsTemplate.js";
import { HandleFormClass } from "../utils/HandleFormClass.js";
import { getMedia } from "../utils/getMedia.js";
import { mediaCard } from "../factories/MediaFactory.js";
import { PhotographerErrorMessage } from "../utils/ErrorMessageClass.js";
import { mediaTemplate } from "../templates/mediaTemplate.js";
import { setFilteredMedias } from "../utils/filteredMedias.js";
import { HandleLikesClass } from "../utils/HandleLikesClass.js";
import { HandleLightboxClass } from "../utils/HandleLightboxClass.js";

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
    const mediasLikes = new HandleLikesClass();
    mediasLikes.displayPhotographerPrice(choosenPhotographer.price);
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
  const { photographers } = await getPhotographers();
  const { medias } = await getMedia();

  if ((photographers || photographers.length > 0) && (!medias || medias.length === 0)) {
    const errorMessage = new PhotographerErrorMessage();
    const mediasWrapper = document.getElementsByClassName("medias")[0];

    errorMessage.displayErrorMessage();
    mediasWrapper.style.display = "none";
  }

  if (medias) {
    const currentUrl = new URLSearchParams(window.location.search);
    const photographerId = currentUrl.get("id");
    const photographerMedias = [];

    medias.find((media) => {
      if (media.photographerId === Number(photographerId)) {
        const photographerMedia = mediaCard({
          title: media.title,
          likes: media.likes,
          photographerId: media.photographerId,
          mediaFile: media.video ? media.video : media.image,
          date: media.date,
          id: media.id,
        });

        photographerMedias.push(photographerMedia);

        const mediasWrapper = document.getElementsByClassName("medias-wrapper")[0];
        const mediaModel = mediaTemplate(photographerMedia);
        mediasWrapper.appendChild(mediaModel);
      }
    });

    setFilteredMedias(photographerMedias);
    updateMediasLikes(photographerMedias);
    updateCarousel(photographerMedias, photographerId);
  }
};

export const updateMediasLikes = (photographerMedias) => {
  const mediasLikes = new HandleLikesClass();
  photographerMedias.forEach((media) => {
    mediasLikes.displayMediasLikes(media.likes);
    mediasLikes.setLikes(media.likes, media.id);
  });
};

export const updateCarousel = (photographerMedias, photographerId) => {
  const lightbox = new HandleLightboxClass();
  lightbox.handleLightbox();
  photographerMedias.forEach((media) => {
    lightbox.displayLightbox(media, photographerId, "click");
    lightbox.displayLightbox(media, photographerId, "keydown");
  });
  lightbox.setCarousel(photographerMedias, photographerId, "click");
  lightbox.setCarousel(photographerMedias, photographerId, "keydown");
};

function init() {
  displayPhotographer();
  displayMedia();
}

init();
