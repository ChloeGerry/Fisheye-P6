export class HandleLikesClass {
  constructor() {
    this.main = document.getElementById("main");
    this.totalLikes = 0;
    this.likes = document.querySelectorAll(".likes-number");
  }

  displayPhotographerPrice = (photographerDailyPrice) => {
    const mediasLikesWrapper = document.createElement("aside");
    mediasLikesWrapper.classList.add("medias-likes-wrapper");
    this.main.appendChild(mediasLikesWrapper);

    const totalOfMediasLikesWrapper = document.createElement("span");
    totalOfMediasLikesWrapper.classList.add("total-medias-likes-wrapper");
    mediasLikesWrapper.appendChild(totalOfMediasLikesWrapper);

    const totalOfMediasLikes = document.createElement("p");
    totalOfMediasLikes.classList.add("media-likes-text");
    totalOfMediasLikesWrapper.appendChild(totalOfMediasLikes);

    const heartIcon = document.createElement("img");
    heartIcon.setAttribute("src", "./assets/icons/like-black-icon.svg");
    heartIcon.setAttribute("alt", "icône d'un coeur");
    totalOfMediasLikesWrapper.appendChild(heartIcon);

    const photographerPrice = document.createElement("p");
    photographerPrice.classList.add("media-likes-text");
    photographerPrice.textContent = `${photographerDailyPrice}€ / jour`;
    mediasLikesWrapper.appendChild(photographerPrice);
  };

  displayMediasLikes = (likes) => {
    this.totalLikes += likes;
    const totalOfMediasLikes = document.getElementsByClassName("media-likes-text")[0];
    totalOfMediasLikes.textContent = this.totalLikes;
  };

  setLikes = (likes, mediaId) => {
    const mediasLikesIcons = document.querySelectorAll(".like-icon");

    for (let i = 0; i < mediasLikesIcons.length; i++) {
      mediasLikesIcons[i].addEventListener("click", () => {
        const likesIconId = parseInt(mediasLikesIcons[i].dataset.id);
        if (mediaId === likesIconId) {
          this.likes.forEach((like) => {
            const numberOfLikes = parseInt(like.dataset.id);
            if (numberOfLikes === mediaId) {
              like.textContent = likes += 1;
              this.totalLikes += 1;
              const totalOfMediasLikes = document.getElementsByClassName("media-likes-text")[0];
              totalOfMediasLikes.textContent = this.totalLikes;
            }
          });
        }
      });
    }
  };
}
