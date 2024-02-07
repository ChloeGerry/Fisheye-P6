import { updateCarousel, updateMediasLikes } from "../pages/photographer.js";
import { mediaTemplate } from "../templates/mediaTemplate.js";

const updatePhotographerMedias = (photographerMedias, sortFunction) => {
  const currentUrl = new URLSearchParams(window.location.search);
  const photographerId = currentUrl.get("id");

  if (photographerMedias) {
    sortPhotographerMedias(photographerMedias, sortFunction);
    updateMediasLikes(photographerMedias);
    updateCarousel(photographerMedias, photographerId);
  }
};

const sortPhotographerMedias = (photographerMedias, sortFunction) => {
  const filteredMedias = photographerMedias.sort(sortFunction);

  const mediasWrapper = document.getElementsByClassName("medias-wrapper")[0];
  mediasWrapper.innerHTML = "";

  filteredMedias.map((filteredMedia) => {
    const mediaModel = mediaTemplate(filteredMedia);
    mediasWrapper.appendChild(mediaModel);
  });
};

export const setFilteredMedias = async (photographerMedias) => {
  const filterItemWrapper = document.getElementsByClassName("filter-item_wrapper")[0];

  filterItemWrapper.innerHTML = `
    <label id="filter-label">Trier par</label>
    <div class="option-items-wrapper" role="listbox" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="filter-label" tabindex="0">
      <div class="popular-item-wrapper">
        <div class="item popular-item" role="listbox" aria-label="popularité" tabindex="0">Popularité</div>
        <img src="./assets/icons/arrow.svg" alt="flèche"  aria-label="dérouler la liste de filtre des medias" class="arrow-icon" tabindex="0">
      </div>
      <div class="item date-item" role="listbox" aria-label="date" tabindex="0">Date</div>
      <div class="item title-item" role="listbox" aria-label="titre" tabindex="0">Titre</div>
    </div>
  `;

  const optionsItemsWrapper = document.getElementsByClassName("option-items-wrapper")[0];
  const filterItemOptionDate = document.getElementsByClassName("date-item")[0];
  const filterItemOptionTitle = document.getElementsByClassName("title-item")[0];

  const displayListbox = (eventType) => {
    const arrow = document.getElementsByClassName("arrow-icon")[0];
    let isListboxOpen = false;

    arrow.addEventListener(eventType, (event) => {
      if (event.key === "Enter") {
        isListboxOpen = !isListboxOpen;
      }
      if (eventType === "click") {
        isListboxOpen = !isListboxOpen;
      }

      if (isListboxOpen) {
        filterItemOptionDate.style.display = "block";
        filterItemOptionTitle.style.display = "block";
        arrow.style.transform = "rotate(0deg)";
        optionsItemsWrapper.setAttribute("aria-expanded", "true");
        filterItemWrapper.style.alignItems = "baseline";
      } else {
        filterItemOptionDate.style.display = "none";
        filterItemOptionTitle.style.display = "none";
        optionsItemsWrapper.setAttribute("aria-expanded", "false");
        arrow.style.transform = "rotate(180deg)";
      }
    });
  };

  displayListbox("click");
  displayListbox("keydown");

  const filterItemOptionPopular = document.getElementsByClassName("popular-item")[0];

  const sortedMedias = [
    {
      domFilterButton: filterItemOptionPopular,
      sortFunction: ({ likes: a }, { likes: b }) => b - a,
    },
    {
      domFilterButton: filterItemOptionDate,
      sortFunction: ({ date: a }, { date: b }) => new Date(a) - new Date(b),
    },
    {
      domFilterButton: filterItemOptionTitle,
      sortFunction: ({ title: a }, { title: b }) => (a < b ? -1 : 1),
    },
  ];

  sortedMedias.forEach((sortedMedia) => {
    sortedMedia.domFilterButton.addEventListener("click", () => {
      updatePhotographerMedias(photographerMedias, sortedMedia.sortFunction);
    });
    sortedMedia.domFilterButton.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        updatePhotographerMedias(photographerMedias, sortedMedia.sortFunction);
      }
    });
  });
};
