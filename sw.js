const CACHE_NAME = "greenbite";


const urlsToCache = [
  // HTML 
  "./index.html",
  "./Tools/tools.html",
  "./recipe/recipes.html",
  "./body/body.html",
  "./calc/calc.html",
  "./contact/contact.html",

  // CSS
  "./css/footnav.css",
  "./style.css",      
  "./Tools/tools.css",
  "./recipe/recipe.css",
  "./body/body.css",
  "./calc/calc.css",
  "./contact/contact.css",

  // JS
  "./java/sub.js",
  "./index.js",
  "./Tools/tools.js",
  "./recipe/recipes.js",
  "./body/body.js",
  "./calc/calc.js",
  "./contact/contact.js",

  // Icons
  "./icons/favicon-16x16.png",
  "./icons/img2.png",

  // Cat icons 
  "./img/cat/vegan.png",
  "./img/cat/high.png",
  "./img/cat/tools.png",
  "./img/cat/work.png",
  "./img/cat/mind.png",

  // Recipe imgs
  "./img/salad.jpg",
  "./img/chicken.jpg",
  "./img/tomato soup.jpg",
  "./img/eggs.jpg",
  "./img/sandwich.jpg",
  "./img/pcake.jpg",
  "./img/fish.jpg",
  "./img/svege.jpg",
  "./img/potato.jpg",

  // Body/Workout imgs
  "./body/img/dumbbell.jpg",
  "./body/img/barbell.jpg",
  "./body/img/abwheel.jpg",
  "./body/img/place.jpg",
  "./body/img/error.png",

  // Music files 
  "./forest.mp3",
  "./piano.mp3",
  "./study.mp3"
];

// Install service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});


self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
