export function mediaTemplate(photographerMedia) {
  const fileMedia = photographerMedia.mediaFile;
  const validImageType = ["jpg"];
  const fileType = fileMedia.includes(validImageType);

  const mediaWrapper = document.createElement("article");
  mediaWrapper.setAttribute("aria-label", "présentation d'une oeuvre du photographe");

  const currentUrl = new URLSearchParams(window.location.search);
  const photographerId = currentUrl.get("id");
  const mediaPath = `./assets/images/${photographerId}/${fileMedia}`;

  if (fileType) {
    const media = document.createElement("img");
    media.classList.add("media");
    media.setAttribute("alt", `${photographerMedia.title}`);
    media.setAttribute("src", `${mediaPath}`);
    media.setAttribute("role", "link");
    media.setAttribute("aria-label", "ouvrir le carousel de medias");
    mediaWrapper.appendChild(media);
  } else {
    const video = document.createElement("video");
    video.classList.add("media");
    video.setAttribute("controls", true);
    video.setAttribute("aria-label", `${photographerMedia.title}`);
    mediaWrapper.appendChild(video);

    const source = document.createElement("source");
    source.setAttribute("src", `${mediaPath}`);
    video.appendChild(source);

    const link = document.createElement("a");
    link.setAttribute("src", `${mediaPath}`);
    link.setAttribute("aria-label", "télécharger la vidéo");
    link.textContent = "MP4";
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
  likes.textContent = `${photographerMedia.likes}`;
  likesWrapper.appendChild(likes);

  const likeIcon = document.createElement("img");
  likeIcon.setAttribute("src", "./assets/icons/like-icon.png");
  likeIcon.setAttribute("alt", "icône d'un coeur");
  likesWrapper.appendChild(likeIcon);

  return mediaWrapper;
}
