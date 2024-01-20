import { getPhotographers } from "../utils/getPhotographer.js";
import { photographerInformationsTemplate } from "../templates/photographerInformationsTemplate.js";
import { HandleFormClass } from "../utils/HandleFormClass.js";
import { getMedia } from "../utils/getMedia.js";
import { mediaCard } from "../factories/MediaFactory.js";
import { PhotographerErrorMessage } from "../utils/ErrorMessageClass.js";

async function displayPhotographer() {
  const { photographers } = await getPhotographers();

  const currentUrl = new URLSearchParams(window.location.search);
  const photographerIdToDisplay = currentUrl.get("id");

  const errorMessage = new PhotographerErrorMessage();
  const photographerInformations = document.getElementsByClassName("photographer-presentation")[0];

  let choosenPhotographer = null;
  let isIdExisting = false;

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
  const currentUrl = new URLSearchParams(window.location.search);
  const photographerId = currentUrl.get("id");

  if (!medias || medias.length === 0) {
    return;
  }

  console.log("medias", medias);
  console.log("photographerId", photographerId);
  if (medias) {
    medias.find((media) => {
      if (media.photographerId === Number(photographerId)) {
        const photographerMedia = mediaCard({
          title: `${media.title}`,
          likes: `${media.likes}`,
          photographerId: `${media.photographerId}`,
          mediaFile: `${media.video ? media.video : media.image}`,
        });

        console.log("photographerMedia", photographerMedia);

        const fileMedia = photographerMedia.mediaFile;
        const validImageType = ["jpg"];
        const fileType = fileMedia.includes(validImageType);

        const mediaSection = document.getElementsByClassName("medias")[0];
        const mediaWrapper = document.createElement("article");
        mediaSection.appendChild(mediaWrapper);

        const mediaPath = `./assets/images/${photographerId}/${fileMedia}`;

        if (fileType) {
          const media = document.createElement("img");
          media.classList.add("media");
          media.setAttribute("alt", `${photographerMedia.title}`);
          media.setAttribute("src", `${mediaPath}`);
          mediaWrapper.appendChild(media);
        } else {
          const video = document.createElement("video");
          const source = document.createElement("source");
          const link = document.createElement("a");
          video.classList.add("media");
          video.setAttribute("controls", true);
          video.setAttribute("aria-label", `${photographerMedia.title}`);
          source.setAttribute("src", `${mediaPath}`);
          link.setAttribute("src", `${mediaPath}`);
          link.textContent = "MP4";
          mediaWrapper.appendChild(video);
          video.appendChild(source);
          video.appendChild(link);
        }

        const mediaInformations = document.createElement("div");
        mediaInformations.classList.add("media-informations");
        mediaWrapper.appendChild(mediaInformations);

        const mediaTitle = document.createElement("h2");
        mediaTitle.textContent = `${photographerMedia.title}`;
        mediaTitle.classList.add("media-title");
        mediaInformations.appendChild(mediaTitle);

        const likesWrapper = document.createElement("span");
        likesWrapper.classList.add("likes-wrapper");
        mediaInformations.appendChild(likesWrapper);

        const likes = document.createElement("p");
        likes.classList.add("likes-number");
        likes.textContent = `${media.likes}`;
        likesWrapper.appendChild(likes);

        const likeIcon = document.createElement("img");
        likeIcon.setAttribute("src", "./assets/icons/like-icon.png");
        likeIcon.setAttribute("alt", "icône de coeur");
        likesWrapper.appendChild(likeIcon);
      }
    });
  }
};

async function init() {
  displayPhotographer();
  displayMedia();
}

init();
