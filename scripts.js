
const $ = id => document.getElementById(id);

// rotating text
(() => {
  const el = $("hero-quote");
  if (!el) return;
  const quotes = [
    "Eat Smart. Live Better.",
    "Move Your Body, Calm Your Mind.",
    "Small Steps, Big Changes.",
    "Fuel Your Day with GreenBite."
  ];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % quotes.length;
    el.textContent = quotes[i];
  }, 4000);
})();

//  Tip of the Day
(() => {
  const el = $("health-tip");
  if (!el) return;
  const tips = [
    "Drink 8 glasses of water today.",
    "Take a 10-minute walk after lunch.",
    "Add leafy greens to at least one meal.",
    "Unplug for 30 minutes before bed.",
    "Practice deep breathing for 5 minutes."
  ];
  el.textContent = tips[new Date().getDate() % tips.length];
})();
