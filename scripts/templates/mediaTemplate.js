import { mediaCard } from "../factories/MediaFactory";

export function mediaTemplate(data) {
  data.find((media) => {
    if (media.photographerId === Number(photographerId)) {
      const photographerMedia = mediaCard({
        title: `${media.title}`,
        likes: `${media.likes}`,
        mediaFile: `${media.video ? media.video : media.image}`,
      });

      console.log("photographerMedia", photographerMedia);

      const fileMedia = photographerMedia.mediaFile;
      const validImageType = ["jpg"];
      const fileType = fileMedia.includes(validImageType);

      const mediaSection = document.getElementsByClassName("media")[0];
      const mediaWrapper = document.createElement("article");
      mediaSection.appendChild(mediaWrapper);

      if (fileType) {
        const media = document.createElement("img");
        media.setAttribute("alt", "");
        mediaWrapper.appendChild(media);
      } else {
        const media = document.createElement("video");
        mediaWrapper.appendChild(media);
      }
    }
  });

  // const { name, portrait, city, country, tagline, price, id } = medias;
  // const media = `assets/images/${photographerId}/${portrait}`;

  // function setPhotographersCards() {
  //   const article = document.createElement("article");
  //   article.setAttribute("aria-label", "présentation d'un photographe");
  //   article.classList.add("photographer-card");

  //   const photographerLink = document.createElement("a");
  //   photographerLink.setAttribute("href", `photographer.html?id=${id}`);
  //   photographerLink.setAttribute("role", "link");
  //   photographerLink.setAttribute("aria-label", "navigation secondaire");
  //   photographerLink.classList.add("photographer-link");

  //   const image = document.createElement("img");
  //   image.setAttribute("src", `${picture}`);
  //   image.setAttribute("alt", `${name}`);
  //   image.classList.add("photographer-picture");

  //   const photographerName = document.createElement("h2");
  //   photographerName.textContent = `${name}`;
  //   photographerName.classList.add("photographer-name");

  //   const location = document.createElement("p");
  //   location.textContent = `${city}, ${country}`;
  //   location.classList.add("photographer-location");

  //   const taglineText = document.createElement("p");
  //   taglineText.textContent = `${tagline}`;
  //   taglineText.classList.add("photographer-tagline");

  //   const photographerPrice = document.createElement("p");
  //   photographerPrice.textContent = `${price}€/jour`;
  //   photographerPrice.classList.add("photographer-price");

  //   article.appendChild(photographerLink);
  //   photographerLink.appendChild(image);
  //   photographerLink.appendChild(photographerName);
  //   article.appendChild(location);
  //   article.appendChild(taglineText);
  //   article.appendChild(photographerPrice);
  //   return article;
  // }
  // return { setPhotographersCards };
}
