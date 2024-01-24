export function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;
  const picture = `./assets/photographers/${portrait}`;

  function setPhotographersCards() {
    const article = document.createElement("article");
    article.setAttribute("aria-label", "présentation d'un photographe");
    article.classList.add("photographer-card");

    const photographerLink = document.createElement("a");
    photographerLink.setAttribute("href", `photographer.html?id=${id}`);
    photographerLink.setAttribute("role", "link");
    photographerLink.setAttribute("aria-label", `navigation secondaire vers la page de ${name}`);
    photographerLink.classList.add("photographer-link");
    article.appendChild(photographerLink);

    const image = document.createElement("img");
    image.setAttribute("src", picture);
    image.setAttribute("alt", name);
    image.classList.add("photographer-picture");
    photographerLink.appendChild(image);

    const photographerName = document.createElement("h2");
    photographerName.textContent = name;
    photographerName.setAttribute("tabindex", 0);
    photographerName.classList.add("photographer-name");
    photographerLink.appendChild(photographerName);

    const location = document.createElement("p");
    location.textContent = `${city}, ${country}`;
    location.setAttribute("tabindex", 0);
    location.classList.add("photographer-location");
    article.appendChild(location);

    const taglineText = document.createElement("p");
    taglineText.textContent = tagline;
    taglineText.setAttribute("tabindex", 0);
    taglineText.classList.add("photographer-tagline");
    article.appendChild(taglineText);

    const photographerPrice = document.createElement("p");
    photographerPrice.textContent = `${price}€/jour`;
    photographerPrice.setAttribute("tabindex", 0);
    photographerPrice.classList.add("photographer-price");
    article.appendChild(photographerPrice);

    return article;
  }
  return { setPhotographersCards };
}
