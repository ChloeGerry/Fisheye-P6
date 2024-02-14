export class HandleLightboxClass {
  constructor() {
    this.main = document.getElementById("main");
    this.medias = document.getElementsByClassName("media");

    this.lightbox = document.getElementById("lightbox-modal");
    this.lightboxWrapper = document.getElementsByClassName("lightbox-wrapper")[0];
    this.lightboxMediaWrapper = document.getElementsByClassName("lightbox-media-wrapper")[0];
    this.closeIcon = document.getElementsByClassName("lightbox-close-icon")[0];
    this.lightboxRightArrow = document.getElementsByClassName("lightbox-right-arrow")[0];
    this.lightboxLeftArrow = document.getElementsByClassName("lightbox-left-arrow")[0];
    this.slideIndex = 0;
  }

  displayLightbox = (photographerMedia, photographerId, eventType) => {
    for (let i = 0; i < this.medias.length; i++) {
      this.medias[i].addEventListener(eventType, (event) => {
        if (event.key === "Enter" || eventType === "click") {
          // get media data-id to set the right media in the lightbox
          const mediaId = Number(this.medias[i].dataset.id);
          if (mediaId === photographerMedia.id) {
            this.slideIndex = i;
            this.lightbox.setAttribute("aria-hidden", "false");
            this.main.setAttribute("aria-hidden", true);
            this.main.setAttribute("tabindex", 1);
            this.lightbox.showModal();
            const choosenMedia = photographerMedia.mediaFile;
            this.lightboxMediaWrapper.innerHTML = `<img src="./assets/images/${photographerId}/${choosenMedia}" alt="${photographerMedia.title}" 
            class="lightbox-media"><h2 class="lightbox-media-title" tabindex="0">${photographerMedia.title}</h2>`;
          }
        }
      });
    }
  };

  closeLightbox = () => {
    this.lightbox.setAttribute("aria-hidden", "true");
    this.lightbox.close();
    this.main.setAttribute("aria-hidden", false);
    this.main.setAttribute("tabindex", 0);
  };

  handleLightbox = () => {
    this.closeIcon.addEventListener("click", () => this.closeLightbox());

    this.closeIcon.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.closeLightbox();
      }
    });
  };

  fillLightbox = (photographerMedias, photographerId) => {
    // fill dynamically the lightbox by checking media type
    const validImageType = ["jpg"];
    const choosenMedia = photographerMedias[this.slideIndex].mediaFile;
    const fileType = choosenMedia.includes(validImageType);

    if (fileType) {
      this.lightboxMediaWrapper.innerHTML = `<img src="./assets/images/${photographerId}/${choosenMedia}" alt="${
        photographerMedias[this.slideIndex].title
      }" class="lightbox-media" tabindex="0">
      <h2 class="lightbox-media-title">${photographerMedias[this.slideIndex].title}</h2>`;
    } else {
      this.lightboxMediaWrapper.innerHTML = `<video controls aria-label="ouvrir ${
        photographerMedias[this.slideIndex].title
      }" class="lightbox-media">
        <source src="./assets/images/${photographerId}/${choosenMedia}" tabindex="0"></source>
        <a href="./assets/images/${photographerId}/${choosenMedia}" aria-label="télécharger la vidéo">MP4</a>
      </video>
      <h2 class="lightbox-media-title">${photographerMedias[this.slideIndex].title}</h2>`;
    }
  };

  setCarousel = (photographerMedias, photographerId, eventType) => {
    this.lightboxRightArrow.addEventListener(eventType, (event) => {
      if (event.key === "ArrowRight" || event.key === "Enter" || eventType === "click") {
        this.slideIndex++;

        if (this.slideIndex === photographerMedias.length) {
          this.slideIndex = 0;
        }

        this.fillLightbox(photographerMedias, photographerId);
      }
    });

    this.lightboxLeftArrow.addEventListener(eventType, (event) => {
      if (event.key === "ArrowLeft" || event.key === "Enter" || eventType === "click") {
        if (this.slideIndex === 0) {
          this.slideIndex = photographerMedias.length;
        }

        this.slideIndex--;
        this.fillLightbox(photographerMedias, photographerId);
      }
    });
  };
}
