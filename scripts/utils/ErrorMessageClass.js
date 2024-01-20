export class PhotographerErrorMessage {
  constructor() {
    this.main = document.getElementById("main");
  }

  displayErrorMessage = () => {
    const errorWrapper = document.createElement("div");
    errorWrapper.classList.add("error-wrapper");

    const error = document.createElement("p");
    error.textContent = "Oups, il semble y avoir une erreur.";
    error.classList.add("error");

    const redirection = document.createElement("a");
    redirection.textContent = "Retourner sur la page d'accueil";
    redirection.setAttribute("href", "index.html");
    redirection.classList.add("redirection-link");
    redirection.setAttribute("role", "link");
    redirection.setAttribute("aria-label", "navigation principale");

    this.main.appendChild(errorWrapper);
    errorWrapper.appendChild(error);
    errorWrapper.appendChild(redirection);

    errorWrapper.style.display = "block";
  };
}
