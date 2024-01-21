export const sendNotification = () => {
  const main = document.getElementById("main");

  const notificationWrapper = document.createElement("div");
  contactButton.setAttribute("aria-label", "message envoyé avec succès");
  notificationWrapper.style.border = "1px solid #312e2e";
  notificationWrapper.style.width = "fit-content";
  notificationWrapper.style.borderRadius = "5px";
  notificationWrapper.style.padding = "0.5em 2em";
  notificationWrapper.style.background = "#312e2e";
  notificationWrapper.style.color = "#FFFFFF";
  notificationWrapper.style.transform = "translate(-50%, -50%)";
  notificationWrapper.style.top = "4%";
  notificationWrapper.style.left = "50%";
  notificationWrapper.style.position = "absolute";
  main.appendChild(notificationWrapper);

  const notificationMessage = document.createElement("p");
  notificationMessage.textContent = "Message envoyé avec succès !";
  notificationWrapper.appendChild(notificationMessage);

  setTimeout(() => {
    notificationWrapper.style.display = "none";
  }, 5000);
};
