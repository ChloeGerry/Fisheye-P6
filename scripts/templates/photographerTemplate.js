export function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;
  const picture = `./assets/photographers/${portrait}`;

  function setPhotographersCards() {
    const article = document.createElement("article");
    article.setAttribute("aria-label", "présentation d'un photographe");
    article.classList.add("photographer-card");

    article.innerHTML = `
      <a href="photographer.html?id=${id}" role="link" aria-label="navigation secondaire vers la page de ${name}" class="photographer-link">
        <img src="${picture}" alt="${name}" class="photographer-picture">
        <h2 class="photographer-name">${name}</h2>
      </a>
      <p class="photographer-location">${city}, ${country}</p>
      <p class="photographer-tagline">${tagline}</p>
      <p class="photographer-price">${price}€/jour</p>
    `;
    return article;
  }
  return { setPhotographersCards };
}
