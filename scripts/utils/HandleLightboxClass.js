export class HandleLightboxClass {
  constructor() {
    this.main = document.getElementById("main");
    this.medias = document.querySelectorAll(".media");
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
      this.medias[i].addEventListener(`${eventType}`, () => {
        const mediaId = parseInt(this.medias[i].dataset.id);
        if (mediaId === photographerMedia.id) {
          this.lightbox.setAttribute("aria-hidden", "false");
          this.main.setAttribute("aria-hidden", true);
          this.main.setAttribute("tabindex", 1);
          this.lightbox.showModal();
          const choosenMedia = photographerMedia.mediaFile;
          this.lightboxMediaWrapper.innerHTML = `<img src="./assets/images/${photographerId}/${choosenMedia}" alt="${photographerMedia.title}" class="lightbox-media">`;
          const mediaName = document.createElement("h2");
          mediaName.textContent = photographerMedia.title;
          mediaName.classList.add("lightbox-media-title");
          this.lightbox.appendChild(mediaName);
        }
      });
    }
  };

  closeLightbox = () => {
    console.log("closeLightbox");
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
    const choosenMedia = photographerMedias[this.slideIndex].mediaFile;
    this.lightboxMediaWrapper.innerHTML = `<img src="./assets/images/${photographerId}/${choosenMedia}" alt="${
      photographerMedias[this.slideIndex].title
    }" class="lightbox-media">`;
    const mediaName = document.getElementsByClassName("lightbox-media-title")[0];
    mediaName.innerHTML = photographerMedias[this.slideIndex].title;
  };

  setCarousel = (photographerMedias, photographerId, eventType) => {
    this.lightboxRightArrow.addEventListener(eventType, (event) => {
      if (event.key === "ArrowRight" || eventType === "click") {
        this.slideIndex++;

        if (this.slideIndex === photographerMedias.length) {
          this.slideIndex = 0;
        }

        this.fillLightbox(photographerMedias, photographerId);
      }
    });

    this.lightboxLeftArrow.addEventListener(eventType, (event) => {
      if (event.key === "ArrowLeft" || eventType === "click") {
        if (this.slideIndex === 0) {
          this.slideIndex = photographerMedias.length;
        }

        this.slideIndex--;
        this.fillLightbox(photographerMedias, photographerId);
      }
    });
  };
}
