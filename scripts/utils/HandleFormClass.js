export class HandleFormClass {
  constructor() {
    this.modalBackground = document.getElementsByClassName("modal-background")[0];
    this.modal = document.getElementById("contact-modal");
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

    this.modalBackground.style.zIndex = "0";
    this.modalBackground.style.background = "#c4c4c466";
  };

  closeModal = () => {
    this.modal.setAttribute("aria-hidden", true);
    this.modal.style.display = "none";

    this.modalBackground.style.zIndex = "-1";
    this.modalBackground.style.background = "#ffffff";
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
