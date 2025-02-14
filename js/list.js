// Hämta container-elementet där vi ska visa recepten.
// Detta är där alla våra recept kommer att visas på webbsidan.
const recipe_list_container = document.querySelector("#recipe_list_container");

// Hämta filter-dropdownen där användaren kan välja vilken typ av måltid de vill filtrera recepten efter
// Vi kommer att lyssna på ändringar här för att uppdatera listan baserat på det valda alternativet.
const filterDropdown = document.querySelector("#mealTypeFilter");

// Här hämtar vi all data från vårt API som innehåller recepten
fetch("https://dummyjson.com/recipes")
  .then((response) => response.json()) // När vi får svar från servern, konverterar vi JSON-svaret till ett JavaScript-objekt
  .then((data) => {
    let recipes = data.recipes; // Vi extraherar recepten från API-svaret och sparar dem i variabeln 'recipes'

    // När vi har hämtat recepten, visar vi dem för användaren direkt utan att tillämpa något filter
    // Vi skickar hela 'recipes' listan till funktionen 'showList' för att visa alla recept på sidan
    showList(recipes);

    // Lägg till en eventlyssnare för filter-dropdownen
    // När användaren gör ett val i dropdownen (t.ex. väljer "Dinner"), filtreras recepten baserat på det valda mealType
    filterDropdown.addEventListener("change", () => {
      const selectedMealType = filterDropdown.value; // Hämta värdet som användaren har valt i dropdownen

      // Här filtrerar vi recepten baserat på det valda mealType. Om användaren valt 'all' eller inte valt något filter,
      // kommer vi att visa alla recept. Om ett specifikt mealType är valt (t.ex. "Dinner"), filtrerar vi recepten för att
      // endast visa de som matchar det mealType.
      const filteredRecipes =
        selectedMealType === "all" || !selectedMealType
          ? recipes // Om 'all' är valt eller inget är valt, visa alla recept
          : recipes.filter((recipe) => recipe.mealType.includes(selectedMealType)); // Annars filtrera på mealType

      // Efter filtreringen uppdaterar vi listan med de filtrerade recepten genom att anropa 'showList' med de nya recepten
      showList(filteredRecipes);

      // Här uppdaterar vi rubriken på sidan för att återspegla det aktuella filtret
      // Om inget filter är valt eller "all" är valt, sätt rubriken till "All Recipes"
      // Annars sätts rubriken till t.ex. "Dinner Recipes" baserat på det valda mealType
      const heading = document.querySelector("#recipe_heading");
      if (selectedMealType === "all" || !selectedMealType) {
        heading.textContent = "All Recipes"; // Rubriken om inga specifika måltider är valda
      } else {
        heading.textContent = `${selectedMealType} Recipes`; // Rubriken om ett specifikt mealType är valt, som "Dinner Recipes"
      }
    });

    // Funktion för att visa recepten på sidan
    // Denna funktion tar emot en lista av recept och skapar HTML-markup som vi sedan lägger till på sidan
    function showList(data) {
      // Vi använder map() för att skapa en HTML-struktur för varje recept i listan.
      // För varje recept skapar vi en artikel (<article>) med information som namn, bild, betyg, tid, svårighetsgrad och taggar.
      const markup = data
        .map(
          (recipe) =>
            `  <article class="card">
              <a href="detaljer.html?id=${recipe.id}">
              <div class="orange">
                <img src="https://cdn.dummyjson.com/recipe-images/${recipe.id}.webp" alt="${recipe.name}" loading="lazy" />  <!-- Visa bild för receptet med lazy loading -->
              </a>
              </div>
              <h2>${recipe.name}</h2>  <!-- Visa receptets namn -->

              <div class="rating">
                <p>${recipe.rating}</p>  <!-- Visa receptets betyg -->
                <p>(${recipe.reviewCount} reviews)</p>  <!-- Visa antalet recensioner -->
              </div>
                            <div class="cooking">

              <p>Cooking Time: <span>${recipe.cookTimeMinutes + recipe.prepTimeMinutes}</span> min</p>  <!-- Visa total tid för matlagning (tillagning + förberedelse) -->
              <p>Difficulty: ${recipe.difficulty}</p>  <!-- Visa svårighetsgrad -->
                            </div>

              <div class="tags">
  ${recipe.tags.map((tag) => `<p>${tag}</p>`).join("")}
</div>
            </article>`
        )
        .join(""); // Vi slår ihop alla recept i en sträng för att skapa en HTML-sektion

      // Nu uppdaterar vi vårt container-element där recepten ska visas på sidan
      // Vi sätter innerHTML till den HTML som vi just har skapat
      recipe_list_container.innerHTML = markup;
    }
  });
