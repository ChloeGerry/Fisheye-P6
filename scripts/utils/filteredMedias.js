import { updateMediasLikes } from "../pages/photographer.js";
import { mediaTemplate } from "../templates/mediaTemplate.js";

const updatePhotographerMedias = (photographerMedias, sortFunction) => {
  if (photographerMedias) {
    sortPhotographerMedias(photographerMedias, sortFunction);
    updateMediasLikes(photographerMedias);
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

  const filterItemsLabel = document.createElement("label");
  filterItemsLabel.setAttribute("id", "filter-label");
  filterItemsLabel.textContent = "Trier par";
  filterItemWrapper.appendChild(filterItemsLabel);

  const optionsItemsWrapper = document.createElement("div");
  optionsItemsWrapper.classList.add("option-items-wrapper");
  optionsItemsWrapper.setAttribute("role", "button");
  optionsItemsWrapper.setAttribute("aria-haspopup", "listbox");
  optionsItemsWrapper.setAttribute("aria-expanded", "false");
  optionsItemsWrapper.setAttribute("aria-labelledby", "filter-label");
  optionsItemsWrapper.setAttribute("tabindex", "0");
  filterItemWrapper.appendChild(optionsItemsWrapper);

  const filterItemOptionPopularWrapper = document.createElement("div");
  filterItemOptionPopularWrapper.innerHTML = `
  <button class="item popular-item" value="Popularité" role="listbox" aria-selected="false" aria-label="popularité" tabindex="0">Popularité</button>
  <img src="./assets/icons/arrow.svg" alt="flèche" class="arrow-icon" tabindex="0">`;
  filterItemOptionPopularWrapper.classList.add("option-item-popular_wrapper");
  optionsItemsWrapper.appendChild(filterItemOptionPopularWrapper);

  const filterItemOptionPopular = document.getElementsByClassName("popular-item")[0];

  const filterItemOptionDate = document.createElement("button");
  filterItemOptionDate.classList.add("item");
  filterItemOptionDate.classList.add("middle-item");
  filterItemOptionDate.setAttribute("value", "Date");
  filterItemOptionDate.setAttribute("role", "listbox");
  filterItemOptionDate.setAttribute("aria-selected", "false");
  filterItemOptionDate.setAttribute("aria-label", "date");
  filterItemOptionDate.setAttribute("tabindex", "0");
  filterItemOptionDate.style.display = "none";
  filterItemOptionDate.textContent = "Date";
  optionsItemsWrapper.appendChild(filterItemOptionDate);

  const filterItemOptionTitle = document.createElement("button");
  filterItemOptionTitle.classList.add("item");
  filterItemOptionTitle.setAttribute("value", "Titre");
  filterItemOptionTitle.setAttribute("role", "listbox");
  filterItemOptionTitle.setAttribute("aria-selected", "false");
  filterItemOptionTitle.setAttribute("aria-label", "titre");
  filterItemOptionTitle.setAttribute("tabindex", "0");
  filterItemOptionTitle.style.display = "none";
  filterItemOptionTitle.textContent = "Titre";
  optionsItemsWrapper.appendChild(filterItemOptionTitle);

  const displayListbox = (eventType) => {
    const arrow = document.getElementsByClassName("arrow-icon")[0];
    let isListboxOpen = false;

    arrow.addEventListener(`${eventType}`, (event) => {
      console.log("event.key", event.key);
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
    sortedMedia.domFilterButton.setAttribute("aria-selected", "false");
    sortedMedia.domFilterButton.addEventListener("click", () => {
      updatePhotographerMedias(
        photographerMedias,
        sortedMedia.sortFunction,
        sortedMedia.domFilterButton.setAttribute("aria-selected", "true")
      );
    });
  });
};
