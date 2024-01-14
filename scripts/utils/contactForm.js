export class HandleModalClass {
  constructor() {
    this.header = document.getElementsByClassName("header")[0];
    this.modal = document.getElementById("contact-modal");
    this.main = document.getElementById("main");
  }

  displayModal = () => {
    this.modal.setAttribute("aria-hidden", false);
    this.modal.style.display = "flex";

    this.main.setAttribute("aria-hidden", true);
    this.main.style.display = "none";

    this.header.setAttribute("aria-hidden", true);
  };

  closeModal = () => {
    this.modal.setAttribute("aria-hidden", true);
    this.modal.style.display = "none";

    this.main.setAttribute("aria-hidden", false);
    this.main.style.display = "block";

    this.header.setAttribute("aria-hidden", false);
  };
}

// export function displayModal() {
//   const modall = new HandleModalClass();
//   console.log("this.modall", this.modall);
//   const modal = document.getElementById("contact-modal");
//   modal.setAttribute("aria-hidden", false);
//   modal.style.display = "flex";

//   const main = document.getElementById("main");
//   main.setAttribute("aria-hidden", true);
//   main.style.display = "none";

//   const header = document.getElementsByClassName("header")[0];
//   header.setAttribute("aria-hidden", true);
// }

// export function closeModal() {
//   const modal = document.getElementById("contact-modal");
//   modal.setAttribute("aria-hidden", true);
//   modal.style.display = "none";

//   const main = document.getElementById("main");
//   main.setAttribute("aria-hidden", false);
//   main.style.display = "block";

//   const header = document.getElementsByClassName("header")[0];
//   header.setAttribute("aria-hidden", false);
// }
