import { updateCarousel, updateMediasLikes } from "../pages/photographer.js";
import { mediaTemplate } from "../templates/mediaTemplate.js";

const filterItemWrapper = document.getElementsByClassName("filter-item_wrapper")[0];

filterItemWrapper.innerHTML = `
    <label id="filter-label">Trier par</label>
    <div class="option-items-wrapper" role="listbox" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="filter-label" tabindex="0">
      <div class="popular-item-wrapper">
        <div class="item first-item" role="listbox" aria-label="Popularité" tabindex="0">Popularité</div>
        <img src="./assets/icons/arrow.svg" alt="flèche"  aria-label="dérouler la liste de filtre des medias" class="arrow-icon" tabindex="0">
      </div>
      <div class="item second-item" role="listbox" aria-label="Date" tabindex="0">Date</div>
      <div class="item third-item" role="listbox" aria-label="Titre" tabindex="0">Titre</div>
    </div>
  `;

const POPULARITY = "Popularité";
const DATE = "Date";
const TITLE = "Titre";

const updatePhotographerMedias = (photographerMedias, sortFunction) => {
  const currentUrl = new URLSearchParams(window.location.search);
  const photographerId = currentUrl.get("id");

  if (photographerMedias) {
    sortPhotographerMedias(photographerMedias, sortFunction);
    updateMediasLikes(photographerMedias);
    updateCarousel(photographerMedias, photographerId);
  }
};

// use sort fonction to filter the medias
const sortPhotographerMedias = (photographerMedias, sortFunction) => {
  const filteredMedias = photographerMedias.sort(sortFunction);

  const mediasWrapper = document.getElementsByClassName("medias-wrapper")[0];
  mediasWrapper.innerHTML = "";

  filteredMedias.map((filteredMedia) => {
    const mediaModel = mediaTemplate(filteredMedia);
    mediasWrapper.appendChild(mediaModel);
  });
};

const fillFilteredListbox = (choosenItem, photographerMedias) => {
  const allFilteredItems = [POPULARITY, DATE, TITLE];
  const filterItemWrapper = document.getElementsByClassName("filter-item_wrapper")[0];
  const notSelectedFilters = allFilteredItems.filter((filterName) => filterName !== choosenItem);

  filterItemWrapper.innerHTML = `
    <label id="filter-label">Trier par</label>
    <div class="option-items-wrapper" role="listbox" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="filter-label" tabindex="0">
      <div class="popular-item-wrapper">
        <div class="item first-item" role="listbox" aria-label="${choosenItem}" tabindex="0">${choosenItem}</div>
        <img src="./assets/icons/arrow.svg" alt="flèche"  aria-label="dérouler la liste de filtre des medias" class="arrow-icon" tabindex="0">
      </div>
      ${notSelectedFilters
        .map(
          (filterName, index) =>
            `<div class="item ${
              ["second", "third"][index]
            }-item" role="listbox" aria-label="${filterName}" tabindex="0">${filterName}</div>`
        )
        .join("")}
    </div>
  `;

  displayListbox("click");
  displayListbox("keydown");
  setFilteredMedias(photographerMedias);
};

const displayListbox = (eventType) => {
  const filterItemWrapper = document.getElementsByClassName("filter-item_wrapper")[0];
  const optionsItemsWrapper = document.getElementsByClassName("option-items-wrapper")[0];
  const filterItemOptionDate = document.getElementsByClassName("second-item")[0];
  const filterItemOptionTitle = document.getElementsByClassName("third-item")[0];

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

export const setFilteredMedias = async (photographerMedias) => {
  displayListbox("click");
  displayListbox("keydown");

  const filterItemOptionDate = document.getElementsByClassName("second-item")[0];
  const filterItemOptionTitle = document.getElementsByClassName("third-item")[0];
  const filterItemOptionPopular = document.getElementsByClassName("first-item")[0];

  // create array to add eventListenerEvent and use sort function to filter medias
  const sortedMedias = [filterItemOptionPopular, filterItemOptionDate, filterItemOptionTitle];

  const filterNameToSort = {
    [POPULARITY]: ({ likes: a }, { likes: b }) => b - a,
    [DATE]: ({ date: a }, { date: b }) => new Date(a) - new Date(b),
    [TITLE]: ({ title: a }, { title: b }) => (a < b ? -1 : 1),
  };

  sortedMedias.forEach((sortedMedia) => {
    sortedMedia.addEventListener("click", () => {
      const choosenItem = sortedMedia.getAttribute("aria-label");
      updatePhotographerMedias(photographerMedias, filterNameToSort[choosenItem]);
      fillFilteredListbox(choosenItem, photographerMedias);
    });
    sortedMedia.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        const choosenItem = sortedMedia.getAttribute("aria-label");
        updatePhotographerMedias(photographerMedias, filterNameToSort[choosenItem]);
        fillFilteredListbox(choosenItem, photographerMedias);
      }
    });
  });
};
