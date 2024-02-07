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
    mediaWrapper.innerHTML = `<img class="media" alt="${photographerMedia.title}" src="${mediaPath}" tabindex="0" data-id="${photographerMedia.id}" role="link"
    aria-label="ouvrir le carousel de medias"> 
    <div class="media-informations" aria-label="informations sur le media" tabindex="0">
      <h2 class="media-title">${photographerMedia.title}</h2>
      <div class="likes-wrapper">
        <p class="likes-number" tabindex="0" data-id="${photographerMedia.id}" aria-label="nombre de j'aime du media">${photographerMedia.likes}</p>
        <img src="./assets/icons/like-icon.svg" alt="icône d'un coeur" role="button" class="like-icon" data-id="${photographerMedia.id}" tabindex="0" 
        aria-label="ajouter un j'aime au média">
      </div>
    </div>`;
  } else {
    mediaWrapper.innerHTML = `<video class="media" controls aria-label="${photographerMedia.title}">
        <source src="${mediaPath}"></source>
        <a href="${mediaPath}" aria-label="télécharger la vidéo">MP4</a>
      </video>
      <div class="media-informations" aria-label="informations sur le media" tabindex="0">
        <h2 class="media-title">${photographerMedia.title}</h2>
        <div class="likes-wrapper">
          <p class="likes-number" tabindex="0" data-id="${photographerMedia.id}" aria-label="nombre de j'aime du media">${photographerMedia.likes}</p>
          <img src="./assets/icons/like-icon.svg" alt="icône d'un coeur" role="button" class="like-icon" data-id="${photographerMedia.id}" tabindex="0" 
          aria-label="ajouter un j'aime au média">
        </div>
      </div>`;
  }
  return mediaWrapper;
}
