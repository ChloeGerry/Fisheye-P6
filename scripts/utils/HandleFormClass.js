import { sendNotification } from "./notification.js";

export class HandleFormClass {
  constructor() {
    this.modalBackground = document.getElementsByClassName("modal-background")[0];
    this.main = document.getElementById("main");
    this.openFormButton = document.getElementsByClassName("contact-button")[0];
    this.modal = document.getElementById("contact-modal");
    this.form = document.getElementsByClassName("form-wrapper")[0];
    this.formTitle = document.getElementsByClassName("modal-title_photographer")[0];
    this.closeIcon = document.getElementsByClassName("close-icon")[0];
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
    this.main.setAttribute("aria-hidden", true);
    this.main.setAttribute("tabindex", 0);
    this.modal.setAttribute("tabindex", 1);
    this.modal.style.display = "flex";

    this.modalBackground.style.zIndex = "0";
    this.modalBackground.style.background = "#c4c4c466";
  };

  closeModal = () => {
    this.modal.setAttribute("aria-hidden", true);
    this.main.setAttribute("aria-hidden", false);
    this.main.setAttribute("tabindex", 1);
    this.modal.setAttribute("tabindex", 0);
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

  handleModal = () => {
    this.openFormButton.addEventListener("click", () => {
      const formFields = this.getFormFields();
      this.displayModal();

      formFields.forEach((field) => {
        field.messageNode.setAttribute("data-error-visible", "false");
        field.accessibilityMessage.setAttribute("aria-invalid", "false");
      });
    });

    this.closeIcon.addEventListener("click", this.closeModal);

    this.closeIcon.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.closeModal();
      }
    });

    this.modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.closeModal();
      }
    });
  };

  validate = () => {
    const formFields = this.getFormFields();
    let areAllFieldsValids = true;

    formFields.forEach((field) => {
      field.messageNode.setAttribute("data-error-visible", field.isInvalid ? "true" : "false");
      field.accessibilityMessage.setAttribute("aria-invalid", field.isInvalid ? "true" : "false");

      if (field.isInvalid) {
        areAllFieldsValids = false;
        return;
      }
    });

    if (areAllFieldsValids) {
      formFields.forEach((field) => {
        console.log(field.fieldName, field.value);
      });

      this.form.reset();
      this.closeModal();
      sendNotification();
    }
  };

  handleForm = (photographerName) => {
    this.formTitle.textContent = ` ${photographerName}`;

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.validate();
    });
  };
}
