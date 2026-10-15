
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    console.log("Navigating to:", link.getAttribute("href"));
  });
});

const contactButton = document.querySelector(".contact .primary-btn");

contactButton.addEventListener("click", () => {
  console.log("Contact button clicked!");
});

console.log("NovaTech landing page loaded successfully!");
