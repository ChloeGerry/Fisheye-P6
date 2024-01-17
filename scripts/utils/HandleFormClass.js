export class HandleFormClass {
  constructor() {
    this.pageContent = document.getElementsByClassName("page-content")[0];
    this.header = document.getElementsByClassName("header")[0];
    this.modal = document.getElementById("contact-modal");
    this.main = document.getElementById("main");
    this.firstNameErrorMessage = document.getElementsByClassName("first-name-error-message")[0];
    this.firstNameInput = document.getElementById("prenom");
    this.lastNameErrorMessage = document.getElementsByClassName("last-name-error-message")[0];
    this.lastNameInput = document.getElementById("nom");
    this.emailErrorMessage = document.getElementsByClassName("email-error-message")[0];
    this.emailInput = document.getElementById("email");
    this.messageErrorMessage = document.getElementsByClassName("message-error-message")[0];
    this.messageInput = document.getElementById("message");
  }

  displayModal = () => {
    this.modal.setAttribute("aria-hidden", false);
    this.modal.style.display = "flex";

    this.pageContent.style.opacity = "0.8";
    this.pageContent.style.backgroundColor = "#c4c4c466";

    // this.main.setAttribute("aria-hidden", true);
    // this.main.style.display = "none";

    // this.header.setAttribute("aria-hidden", true);
  };

  closeModal = () => {
    this.modal.setAttribute("aria-hidden", true);
    this.modal.style.display = "none";

    this.pageContent.style.opacity = "1";
    this.pageContent.style.backgroundColor = "#ffffff";

    // this.main.setAttribute("aria-hidden", false);
    // this.main.style.display = "block";

    // this.header.setAttribute("aria-hidden", false);
  };

  getFormFields = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const formFields = [
      {
        messageNode: this.firstNameErrorMessage,
        accessibilityMessage: this.firstNameInput,
        isInvalid: !this.firstNameInput.value || this.firstNameInput.value.length < 2,
        value: this.firstNameInput.value,
        fieldName: "Prénom :",
      },
      {
        messageNode: this.lastNameErrorMessage,
        accessibilityMessage: this.lastNameInput,
        isInvalid: !this.lastNameInput.value || this.lastNameInput.value.length < 2,
        value: this.lastNameInput.value,
        fieldName: "Nom :",
      },
      {
        messageNode: this.emailErrorMessage,
        accessibilityMessage: this.emailInput,
        isInvalid: !this.emailInput.value || !emailRegex.test(this.emailInput.value),
        value: this.emailInput.value,
        fieldName: "Email :",
      },
      {
        messageNode: this.messageErrorMessage,
        accessibilityMessage: this.messageInput,
        isInvalid: !this.messageInput.value || this.messageInput.value.length < 2,
        value: this.messageInput.value,
        fieldName: "Message :",
      },
    ];

    return formFields;
  };
}
