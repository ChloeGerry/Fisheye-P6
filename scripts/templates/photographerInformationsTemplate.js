export function photographerInformationsTemplate(photographers) {
  const { name, portrait, city, country, tagline } = photographers;
  const picture = `./assets/photographers/${portrait}`;

  function setPhotographerCard() {
    const photographerInformations = document.getElementsByClassName(
      "photographer-presentation"
    )[0];

    photographerInformations.innerHTML = `
      <div class="photographer-profile_wrapper" aria-label="informations sur le profil de ${name}">
        <h1 class="photographer-name">${name}</h1>
        <p class="photographer-location">${city}, ${country}</p>
        <p class="photographer-tagline">${tagline}</p>
      </div>
      <button class="contact-button" role="button" aria-label="me contacter">Contactez-moi</button>
      <img src="${picture}" alt="${name}" class="photographer-picture">
    `;
    return photographerInformations;
  }

  return { setPhotographerCard };
}
