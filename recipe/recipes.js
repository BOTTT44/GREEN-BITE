
  const recipes = [
  // Vegan 
  { category: "vegan", 
    title: "Tofu Stir-Fry", 
    img: "../recipe/imgs/vegan/tofu.jpg", 
    desc: "Simple tofu fried with vegetables." },
  { category: "vegan", 
    title: "Veggie Soup", 
    img: "../recipe/imgs/vegan/veggie soup.jpg", 
    desc: "Light soup with carrots and potatoes." },
  { category: "vegan", 
    title: "Salad", 
    img: "../recipe/imgs/vegan/salad.jpg", 
    desc: "Fresh lettuce, tomato, and cucumber." },
  { category: "vegan", 
    title: "Rice and Beans", 
    img: "../recipe/imgs/vegan/rnc.jpg", 
    desc: "Steamed rice served with beans." },
  { category: "vegan", 
    title: "Mashed Potatoes", 
    img: "../recipe/imgs/vegan/mashed potatoes.jpg", 
    desc: "Soft potatoes mashed with salt." },
  { category: "vegan", 
    title: "Grilled Vegetables", 
    img: "../recipe/imgs/vegan/grilled vegetable.jpg", 
    desc: "Zucchini, carrots, and peppers grilled." },

  // Easy 
  { category: "easy", 
    title: "Fried Chicken", 
    img: "../recipe/imgs/easy/chicken.jpg", 
    desc: "Crispy fried chicken." },
  { category: "easy", 
    title: "Tomato Soup", 
    img: "../recipe/imgs/easy/tomato soup.jpg", 
    desc: "Simple homemade tomato soup." },
  { category: "easy", 
    title: "Boiled Eggs", 
    img: "../recipe/imgs/easy/eggs.jpg", 
    desc: "Eggs boiled until firm." },
  { category: "easy", 
    title: "Sandwich", 
    img: "../recipe/imgs/easy/sandwich.jpg", 
    desc: "Basic bread, cheese, and ham sandwich." },
  { category: "easy", 
    title: "Plain Pasta", 
    img: "../recipe/imgs/easy/plain pasta.jpg", 
    desc: "Cooked pasta with butter or oil." },
  { category: "easy", 
    title: "Omelette", 
    img: "../recipe/imgs/easy/omellete.jpg", 
    desc: "Fluffy egg omelette." },

  // Nutrition 
  { category: "nutrition", 
    title: "Pancakes", 
    img: "../recipe/imgs/high/pcake.jpg", 
    desc: "Soft pancakes with syrup." },
  { category: "nutrition", 
    title: "Grilled Fish", 
    img: "../recipe/imgs/high/fish.jpg", 
    desc: "Lightly seasoned grilled fish." },
  { category: "nutrition", 
    title: "Steamed Vegetables", 
    img: "../recipe/imgs/high/svege.jpg", 
    desc: "Carrots, broccoli, and beans steamed." },
  { category: "nutrition", 
    title: "Baked Potato", 
    img: "../recipe/imgs/high/potato.jpg", 
    desc: "Simple baked potato with skin." },
  { category: "nutrition", 
    title: "Fruit Bowl", 
    img: "../recipe/imgs/high/fruit.jpg", 
    desc: "Mixed seasonal fruits." },
  { category: "nutrition", 
    title: "Rice and Chicken", 
    img: "../recipe/imgs/high/rice.jpg", 
    desc: "Steamed rice with grilled chicken." }
];






const recipesContainer = document.getElementById("recipes");
const searchInput = document.getElementById("searchbar");
const categoryButtons = document.querySelectorAll(".catbtn");

// Render recipes
function renderRecipes(filterCategory = "vegan", searchTerm = "") {
  recipesContainer.innerHTML = "";

  const filtered = recipes.filter(recipe => {
    const matchesCategory = recipe.category === filterCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    return searchTerm ? matchesSearch : matchesCategory;
  });

  if (filtered.length === 0) {
    recipesContainer.innerHTML = `<p>No recipes found.</p>`;
    return;
  }

  filtered.forEach(r => {
    const box = document.createElement("div");
    box.className = "fbox";
    box.innerHTML = `
      <img src="${r.img}" alt="${r.title}" class="fimg">
      <h2 class="ftitle">${r.title}</h2>
      <p class="fdesc">${r.desc}</p>
    `;
    recipesContainer.appendChild(box);
  });
}

// Categorys
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".catbtn.active").classList.remove("active");
    btn.classList.add("active");
    renderRecipes(btn.dataset.category, searchInput.value);
  });
});

// Search
searchInput.addEventListener("input", () => {
  renderRecipes("", searchInput.value);
});


let initialCategory = "vegan";
if (window.location.hash) {
  const hash = window.location.hash.substring(1); // remove "#"
  if (["vegan", "easy", "nutrition"].includes(hash)) {
    initialCategory = hash;
    document.querySelectorAll(".catbtn").forEach(btn => {
      btn.classList.remove("active");
      if (btn.dataset.category === hash) btn.classList.add("active");
    });
  }
}
renderRecipes(initialCategory);

const recipeDetails = {
  // Vegan 
  "Tofu Stir-Fry": {
    ingredients: [
      "200g firm tofu, cubed",
      "1 cup broccoli florets",
      "1 red bell pepper, sliced",
      "1 carrot, sliced",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil"
    ],
    steps: [
      "Heat oil in a pan.",
      "Add tofu and fry until golden.",
      "Add vegetables and stir-fry.",
      "Pour soy sauce and mix well."
    ],
    nutrition: { Calories: "320 kcal", Protein: "18g", Carbs: "14g", Fat: "20g" }
  },
  "Veggie Soup": {
    ingredients: ["2 carrots", "2 potatoes", "1 onion", "4 cups water", "Salt to taste"],
    steps: ["Boil vegetables until soft.", "Mash lightly or blend.", "Season with salt and pepper."],
    nutrition: { Calories: "150 kcal", Protein: "4g", Carbs: "30g", Fat: "2g" }
  },
  "Salad": {
    ingredients: ["1 cup lettuce", "1 tomato", "1 cucumber", "2 tbsp olive oil", "Salt & pepper"],
    steps: ["Wash vegetables.", "Chop and mix in a bowl.", "Add oil, salt, and pepper."],
    nutrition: { Calories: "90 kcal", Protein: "2g", Carbs: "12g", Fat: "5g" }
  },
  "Rice and Beans": {
    ingredients: ["1 cup rice", "1 cup beans (cooked)", "1 tbsp oil", "Salt to taste"],
    steps: ["Cook rice.", "Heat beans with oil and salt.", "Mix with rice and serve."],
    nutrition: { Calories: "250 kcal", Protein: "10g", Carbs: "45g", Fat: "5g" }
  },
  "Mashed Potatoes": {
    ingredients: ["3 potatoes", "2 tbsp butter", "1/4 cup milk", "Salt to taste"],
    steps: ["Boil potatoes until soft.", "Mash with butter and milk.", "Season with salt."],
    nutrition: { Calories: "200 kcal", Protein: "4g", Carbs: "35g", Fat: "7g" }
  },
  "Grilled Vegetables": {
    ingredients: ["1 zucchini", "1 carrot", "1 bell pepper", "1 tbsp olive oil"],
    steps: ["Slice vegetables.", "Brush with oil.", "Grill until soft and slightly charred."],
    nutrition: { Calories: "120 kcal", Protein: "3g", Carbs: "15g", Fat: "6g" }
  },

  //  Easy 
  "Fried Chicken": {
    ingredients: ["2 chicken thighs", "1 cup flour", "1 egg", "Oil for frying"],
    steps: ["Dip chicken in egg.", "Coat with flour.", "Fry until golden and cooked through."],
    nutrition: { Calories: "350 kcal", Protein: "28g", Carbs: "15g", Fat: "20g" }
  },
  "Tomato Soup": {
    ingredients: ["4 tomatoes", "1 onion", "2 cups water", "Salt & pepper"],
    steps: ["Boil tomatoes and onion.", "Blend until smooth.", "Season and serve warm."],
    nutrition: { Calories: "100 kcal", Protein: "3g", Carbs: "18g", Fat: "2g" }
  },
  "Boiled Eggs": {
    ingredients: ["2 eggs", "Water", "Salt"],
    steps: ["Place eggs in boiling water.", "Cook 8–10 minutes.", "Peel and season with salt."],
    nutrition: { Calories: "150 kcal", Protein: "12g", Carbs: "1g", Fat: "10g" }
  },
  "Sandwich": {
    ingredients: ["2 bread slices", "1 slice cheese", "2 slices ham", "Butter (optional)"],
    steps: ["Spread butter on bread.", "Layer ham and cheese.", "Toast or eat fresh."],
    nutrition: { Calories: "250 kcal", Protein: "12g", Carbs: "28g", Fat: "9g" }
  },
  "Plain Pasta": {
    ingredients: ["1 cup pasta", "2 cups water", "Salt", "1 tbsp butter"],
    steps: ["Boil pasta until soft.", "Drain water.", "Mix with butter and serve."],
    nutrition: { Calories: "210 kcal", Protein: "7g", Carbs: "40g", Fat: "4g" }
  },
  "Omelette": {
    ingredients: ["2 eggs", "Salt", "1 tbsp oil"],
    steps: ["Whisk eggs with salt.", "Heat oil in pan.", "Cook eggs until fluffy."],
    nutrition: { Calories: "180 kcal", Protein: "12g", Carbs: "2g", Fat: "14g" }
  },

  // Nutrition 
  "Pancakes": {
    ingredients: ["1 cup flour", "1 egg", "1 cup milk", "1 tbsp sugar"],
    steps: ["Mix ingredients.", "Cook on non-stick pan.", "Flip and serve with toppings."],
    nutrition: { Calories: "220 kcal", Protein: "6g", Carbs: "28g", Fat: "9g" }
  },
  "Grilled Fish": {
    ingredients: ["1 fish fillet", "1 tbsp oil", "Salt & pepper"],
    steps: ["Season fish.", "Grill on both sides until cooked.", "Serve hot."],
    nutrition: { Calories: "200 kcal", Protein: "22g", Carbs: "0g", Fat: "12g" }
  },
  "Steamed Vegetables": {
    ingredients: ["1 cup carrots", "1 cup broccoli", "1 cup beans", "Salt"],
    steps: ["Steam vegetables until soft.", "Season with salt."],
    nutrition: { Calories: "110 kcal", Protein: "5g", Carbs: "18g", Fat: "2g" }
  },
  "Baked Potato": {
    ingredients: ["1 large potato", "1 tsp oil", "Salt"],
    steps: ["Wash potato.", "Bake until soft inside.", "Season with salt."],
    nutrition: { Calories: "160 kcal", Protein: "4g", Carbs: "37g", Fat: "0g" }
  },
  "Fruit Bowl": {
    ingredients: ["1 banana", "1 apple", "1 orange", "Handful of grapes"],
    steps: ["Wash fruits.", "Chop into pieces.", "Mix in a bowl."],
    nutrition: { Calories: "180 kcal", Protein: "2g", Carbs: "45g", Fat: "1g" }
  },
  "Rice and Chicken": {
    ingredients: ["1 cup rice", "1 chicken breast", "Salt", "1 tbsp oil"],
    steps: ["Cook rice.", "Grill chicken breast.", "Serve chicken with rice."],
    nutrition: { Calories: "300 kcal", Protein: "26g", Carbs: "35g", Fat: "7g" }
  }
};


// Modal 
const infoModal = document.getElementById("infoModal");
const ititle = document.getElementById("ititle");
const iimage = document.getElementById("iimage");
const iingredients = document.getElementById("iingredients");
const isteps = document.getElementById("isteps");
const inutrition = document.getElementById("inutrition").querySelector("tbody");
const iclose = document.querySelector(".iclose");

// recipe click
recipesContainer.addEventListener("click", (e) => {
  const box = e.target.closest(".fbox");
  if (!box) return;

  const title = box.querySelector(".ftitle").textContent;
  ititle.textContent = title;
  iimage.src = box.querySelector(".fimg").src;

  // Ingredients
  iingredients.innerHTML = "";
  (recipeDetails[title]?.ingredients || []).forEach(ing => {
    const li = document.createElement("li");
    li.textContent = ing;
    iingredients.appendChild(li);
  });

  // Steps
  isteps.innerHTML = "";
  (recipeDetails[title]?.steps || []).forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    isteps.appendChild(li);
  });

  // Nutrition
  inutrition.innerHTML = "";
  const nutritionData = recipeDetails[title]?.nutrition || {};
  for (let nutrient in nutritionData) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${nutrient}</td><td>${nutritionData[nutrient]}</td>`;
    inutrition.appendChild(tr);
  }

  infoModal.style.display = "block";
});

// Close modal
iclose.onclick = () => { infoModal.style.display = "none"; };
window.onclick = (e) => { if (e.target === infoModal) infoModal.style.display = "none"; };
