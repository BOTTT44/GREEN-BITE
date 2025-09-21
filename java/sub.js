document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav a");
  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    if (currentPath.includes(link.getAttribute("href").replace("..", ""))) {
      link.classList.add("active");
    }
  });
});




function get(id) {
  return document.getElementById(id);
}

//  form
const newsForm = get("newsletter-form");
if (newsForm) {
  newsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = get("email");
    const email = emailInput.value || "";
    if (email) {
      try {
        localStorage.setItem("greenbiteEmail", email);
        alert("✅ Thanks for subscribing!");
      } catch {
        alert("Subscribed (could not save locally).");
      }
      newsForm.reset();
    }
  });
}



  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }


// Update year
const y = get("year");
if (y) y.textContent = new Date().getFullYear();

//  HAMBURGER
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("main-nav");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active"); 
    nav.classList.toggle("show");        
  });
});
