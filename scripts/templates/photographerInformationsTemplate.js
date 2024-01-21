export function photographerInformationsTemplate(photographers) {
  const { name, portrait, city, country, tagline } = photographers;
  const picture = `./assets/photographers/${portrait}`;

  function setPhotographerCard() {
    const photographerInformations = document.getElementsByClassName(
      "photographer-presentation"
    )[0];

    const photographerProfileWrapper = document.createElement("div");
    photographerProfileWrapper.classList.add("photographer-profile_wrapper");
    photographerProfileWrapper.setAttribute("tabindex", 0);
    photographerProfileWrapper.setAttribute("aria-label", `informations sur le profil de ${name}`);
    photographerInformations.append(photographerProfileWrapper);

    const photographerName = document.createElement("h1");
    photographerName.textContent = `${name}`;
    photographerName.setAttribute("tabindex", 0);
    photographerName.classList.add("photographer-name");
    photographerProfileWrapper.append(photographerName);

    const photographerLocation = document.createElement("p");
    photographerLocation.textContent = `${city}, ${country}`;
    photographerLocation.setAttribute("tabindex", 0);
    photographerLocation.classList.add("photographer-location");
    photographerProfileWrapper.append(photographerLocation);

    const photographerTagline = document.createElement("p");
    photographerTagline.textContent = `${tagline}`;
    photographerTagline.setAttribute("tabindex", 0);
    photographerTagline.classList.add("photographer-tagline");
    photographerProfileWrapper.append(photographerTagline);

    const contactButton = document.createElement("button");
    contactButton.textContent = "Contactez-moi";
    contactButton.classList.add("contact-button");
    contactButton.setAttribute("role", "button");
    contactButton.setAttribute("aria-label", "me contacter");
    photographerInformations.append(contactButton);

    const photographerPicture = document.createElement("img");
    photographerPicture.setAttribute("src", `${picture}`);
    photographerPicture.setAttribute("alt", `${name}`);
    photographerPicture.setAttribute("tabindex", 0);
    photographerPicture.classList.add("photographer-picture");
    photographerInformations.append(photographerPicture);

    return photographerInformations;
  }

  return { setPhotographerCard };
}
