export class PhotographerErrorMessage {
  constructor() {
    this.main = document.getElementById("main");
  }

  displayErrorMessage = () => {
    const errorWrapper = document.createElement("div");
    errorWrapper.classList.add("error-wrapper");
    this.main.appendChild(errorWrapper);

    const error = document.createElement("p");
    error.textContent = "Oups, il semble y avoir une erreur.";
    error.classList.add("error");
    errorWrapper.appendChild(error);

    const redirection = document.createElement("a");
    redirection.textContent = "Retourner sur la page d'accueil";
    redirection.setAttribute("href", "index.html");
    redirection.classList.add("redirection-link");
    redirection.setAttribute("role", "link");
    redirection.setAttribute("aria-label", "navigation principale");
    errorWrapper.appendChild(redirection);

    errorWrapper.style.display = "block";
  };
}
