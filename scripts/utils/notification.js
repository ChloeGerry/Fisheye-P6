export const sendNotification = () => {
  const main = document.getElementById("main");
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  main.innerHTML += `<div aria-label="message envoyé avec succès" class="notification-wrapper"><p>Message envoyé avec succès !</p></div>`;
  const notificationWrapper = document.getElementsByClassName("notification-wrapper")[0];

  setTimeout(() => {
    notificationWrapper.style.display = "none";
  }, 5000);
};
