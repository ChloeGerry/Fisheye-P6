export class PhotographerErrorMessage {
  constructor() {
    this.main = document.getElementById("main");
  }

  displayErrorMessage = () => {
    const errorWrapper = document.createElement("div");
    errorWrapper.classList.add("error-wrapper");
    this.main.appendChild(errorWrapper);

    errorWrapper.innerHTML = `
      <p class="error">Oups, il semble y avoir une erreur.</p>
      <a href="index.html" class="redirection-link" role="link" aria-label="navigation principale">Retourner sur la page d'accueil</a>
    `;

    errorWrapper.style.display = "block";
  };
}
