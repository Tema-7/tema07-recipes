const recipe_list_container = document.querySelector("#recipe_list_container");
const selectElement = document.querySelector("#mealTypeFilter");
const recipeHeading = document.querySelector("#recipe_heading"); // Hämta <h1>

// Lägg till event listener för att filtrera recepten och uppdatera rubriken
selectElement.addEventListener("change", ShowProduct);

function ShowProduct(event) {
  fetch("https://dummyjson.com/recipes")
    .then((response) => response.json())
    .then((data) => {
      let recipes = data.recipes; // Hämta alla recept från API

      // Hämta valt filtervärde från dropdownen
      let selectedMealType = selectElement.value;

      // Filtrera recepten baserat på valt mealType
      let filteredRecipes;
      if (selectedMealType === "all") {
        filteredRecipes = recipes;
        recipeHeading.textContent = "All Recipes"; // Uppdatera H1 till standardrubrik
      } else {
        filteredRecipes = recipes.filter((recipe) => recipe.mealType.includes(selectedMealType));
        recipeHeading.textContent = `${selectedMealType} Recipes`; // Uppdatera H1 baserat på valt filter
      }

      // Skapa HTML för de filtrerade recepten
      const markup = filteredRecipes
        .map(
          (recipe) => `
          <article class="card">
            <a href="detaljer.html?id=${recipe.id}">
            <div class="orange">
              <img src="https://cdn.dummyjson.com/recipe-images/${recipe.id}.webp" alt="${recipe.name}" loading="lazy" />
            </a>
            </div>
            <h2>${recipe.name}</h2>
            <div class="rating">
              <p>${recipe.rating} ★</p>
              <p>(${recipe.reviewCount} reviews)</p>
            </div>
            <div class="cooking">
              <p>Cooking Time: <span>${recipe.cookTimeMinutes + recipe.prepTimeMinutes}</span> min</p>
              <p>Difficulty: ${recipe.difficulty}</p>
            </div>
            <div class="tags">
              ${recipe.tags.map((tag) => `<p>${tag}</p>`).join("")}
            </div>
          </article>`
        )
        .join(""); // Slå ihop HTML till en enda sträng

      // Uppdatera listan med filtrerade recept
      recipe_list_container.innerHTML = markup;
    });
}

ShowProduct();
