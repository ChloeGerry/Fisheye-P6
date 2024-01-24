import { mediaTemplate } from "../templates/mediaTemplate.js";

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
  filterItemOptionPopularWrapper.innerHTML = `<img src="./assets/icons/arrow.svg" alt="flèche" class="arrow-icon">`;
  filterItemOptionPopularWrapper.classList.add("option-item-popular_wrapper");
  optionsItemsWrapper.appendChild(filterItemOptionPopularWrapper);

  const filterItemOptionPopular = document.createElement("button");
  filterItemOptionPopular.classList.add("item");
  filterItemOptionPopular.setAttribute("value", "Popularité");
  filterItemOptionPopular.setAttribute("role", "listbox");
  filterItemOptionPopular.setAttribute("aria-selected", "true");
  filterItemOptionPopular.setAttribute("aria-labelledby", "filter-label");
  filterItemOptionPopular.textContent = "Popularité";
  filterItemOptionPopularWrapper.appendChild(filterItemOptionPopular);

  const filterItemOptionDate = document.createElement("button");
  filterItemOptionDate.classList.add("item");
  filterItemOptionDate.classList.add("middle-item");
  filterItemOptionDate.setAttribute("value", "Date");
  filterItemOptionDate.setAttribute("role", "listbox");
  filterItemOptionDate.setAttribute("aria-selected", "false");
  filterItemOptionDate.setAttribute("aria-labelledby", "filter-label");
  filterItemOptionDate.style.display = "none";
  filterItemOptionDate.textContent = "Date";
  optionsItemsWrapper.appendChild(filterItemOptionDate);

  const filterItemOptionTitle = document.createElement("button");
  filterItemOptionTitle.classList.add("item");
  filterItemOptionTitle.setAttribute("value", "Titre");
  filterItemOptionTitle.setAttribute("role", "listbox");
  filterItemOptionTitle.setAttribute("aria-selected", "false");
  filterItemOptionTitle.setAttribute("aria-labelledby", "filter-label");
  filterItemOptionTitle.style.display = "none";
  filterItemOptionTitle.textContent = "Titre";
  optionsItemsWrapper.appendChild(filterItemOptionTitle);

  const arrow = document.getElementsByClassName("arrow-icon")[0];
  let isListboxOpen = false;

  arrow.addEventListener("click", () => {
    isListboxOpen = !isListboxOpen;

    if (isListboxOpen) {
      filterItemOptionDate.style.display = "block";
      filterItemOptionTitle.style.display = "block";
      arrow.style.transform = "rotate(0deg)";
      filterItemWrapper.style.alignItems = "baseline";
    } else {
      filterItemOptionDate.style.display = "none";
      filterItemOptionTitle.style.display = "none";
      arrow.style.transform = "rotate(180deg)";
    }
  });

  filterItemOptionPopular.addEventListener("click", () => {
    if (photographerMedias) {
      const filteredMedias = photographerMedias.sort(({ likes: a }, { likes: b }) => {
        return b - a;
      });

      const mediasWrapper = document.getElementsByClassName("medias-wrapper")[0];
      mediasWrapper.innerHTML = "";

      filteredMedias.map((filteredMedia) => {
        const mediaModel = mediaTemplate(filteredMedia);
        mediasWrapper.appendChild(mediaModel);
      });
    }
  });

  filterItemOptionDate.addEventListener("click", () => {
    if (photographerMedias) {
      const filteredMedias = photographerMedias.sort(
        ({ date: a }, { date: b }) => new Date(a) - new Date(b)
      );

      const mediasWrapper = document.getElementsByClassName("medias-wrapper")[0];
      mediasWrapper.innerHTML = "";

      filteredMedias.map((filteredMedia) => {
        const mediaModel = mediaTemplate(filteredMedia);
        mediasWrapper.appendChild(mediaModel);
      });
    }
  });

  filterItemOptionTitle.addEventListener("click", () => {
    if (photographerMedias) {
      const filteredMedias = photographerMedias.sort(({ title: a }, { title: b }) =>
        a < b ? -1 : 1
      );

      const mediasWrapper = document.getElementsByClassName("medias-wrapper")[0];
      mediasWrapper.innerHTML = "";

      filteredMedias.map((filteredMedia) => {
        const mediaModel = mediaTemplate(filteredMedia);
        mediasWrapper.appendChild(mediaModel);
      });
    }
  });
};
