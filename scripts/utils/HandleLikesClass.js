export class HandleLikesClass {
  constructor() {
    this.main = document.getElementById("main");
    this.totalLikes = 0;
    this.likes = document.querySelectorAll(".likes-number");
  }

  displayPhotographerPrice = async (photographerDailyPrice) => {
    this.main.innerHTML += `
      <aside class="medias-likes-wrapper" role="complementary">
        <div class="total-medias-likes-wrapper">
          <p class="media-likes-text" aria-label="nombre total de j'aime du photographe"></p>
          <img src="./assets/icons/like-black-icon.svg" alt="icône d'un coeur">
        </div>
        <p class="media-likes-text">${photographerDailyPrice}€ / jour</p>
      </aside>
    `;
  };

  displayMediasLikes = (likes) => {
    const totalOfMediasLikes = document.getElementsByClassName("media-likes-text")[0];
    this.totalLikes += likes;
    totalOfMediasLikes.textContent = this.totalLikes;
  };

  updateMediasLikes = (likes, mediaId, eventType) => {
    const mediasLikesIcons = document.getElementsByClassName("like-icon");
    const totalOfMediasLikes = document.getElementsByClassName("media-likes-text")[0];

    for (let i = 0; i < mediasLikesIcons.length; i++) {
      mediasLikesIcons[i].addEventListener(eventType, (event) => {
        if (event.key === "Enter" || eventType === "click") {
          const likesIconId = parseInt(mediasLikesIcons[i].dataset.id);
          if (mediaId === likesIconId) {
            this.likes.forEach((like) => {
              const numberOfLikes = parseInt(like.dataset.id);
              if (numberOfLikes === mediaId) {
                like.textContent = likes += 1;
                this.totalLikes += 1;
                totalOfMediasLikes.textContent = this.totalLikes;
              }
            });
          }
        }
      });
    }
  };

  setLikes = async (likes, mediaId) => {
    this.updateMediasLikes(likes, mediaId, "click");
    this.updateMediasLikes(likes, mediaId, "keydown");
  };
}
