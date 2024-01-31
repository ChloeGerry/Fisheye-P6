export class HandleLightboxClass {
  constructor() {
    this.main = document.getElementById("main");
    this.medias = document.querySelectorAll(".media");
    this.lightbox = document.getElementById("lightbox-modal");
    this.lightboxWrapper = document.getElementsByClassName("lightbox-wrapper")[0];
    this.lightboxMediaWrapper = document.getElementsByClassName("lightbox-media-wrapper")[0];
    this.closeIcon = document.getElementsByClassName("lightbox-close-icon")[0];
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
    this.closeIcon.addEventListener("click", () => {
      console.log("click");
      this.closeLightbox();
    });

    this.closeIcon.addEventListener("keydown", (event) => {
      console.log("keydown");
      if (event.key === "Enter") {
        this.closeLightbox();
      }
    });
  };
}
