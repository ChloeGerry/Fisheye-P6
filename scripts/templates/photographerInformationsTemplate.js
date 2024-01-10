export function photographerInformationsTemplate(photographers) {
  const { name, portrait, city, country, tagline } = photographers;
  const picture = `assets/photographers/${portrait}`;

  function setPhotographerCard() {
    const photographerInformations = document.getElementsByClassName(
      "photographer-presentation"
    )[0];

    const photographerProfileWrapper = document.createElement("div");
    photographerProfileWrapper.classList.add("photographer-profile_wrapper");
    photographerProfileWrapper.setAttribute(
      "aria-label",
      "informations sur le profil du photographe"
    );

    const photographerName = document.createElement("h1");
    photographerName.textContent = `${name}`;
    photographerName.classList.add("photographer-name");

    const photographerLocation = document.createElement("p");
    photographerLocation.textContent = `${city}, ${country}`;
    photographerLocation.classList.add("photographer-location");

    const photographerTagline = document.createElement("p");
    photographerTagline.textContent = `${tagline}`;
    photographerTagline.classList.add("photographer-tagline");

    const contactButton = document.createElement("button");
    contactButton.textContent = "Contactez-moi";
    contactButton.classList.add("contact-button");
    contactButton.setAttribute("role", "button");
    contactButton.setAttribute("aria-label", "me contacter");

    const photographerPicture = document.createElement("img");
    photographerPicture.setAttribute("src", `${picture}`);
    photographerPicture.setAttribute("alt", `${name}`);
    photographerPicture.classList.add("photographer-picture");

    photographerInformations.append(photographerProfileWrapper);
    photographerProfileWrapper.append(photographerName);
    photographerProfileWrapper.append(photographerLocation);
    photographerProfileWrapper.append(photographerTagline);
    photographerInformations.append(contactButton);
    photographerInformations.append(photographerPicture);
    return photographerInformations;
  }

  return { setPhotographerCard };
}
