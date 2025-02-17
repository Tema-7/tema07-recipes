// Hämta produktens ID från URL (den här ID:n används för att hämta ett specifikt recept från API)
const myid = new URLSearchParams(window.location.search).get("id");
// Välj elementet där receptet ska visas på sidan
const singlerecipeContainer = document.querySelector("#singlerecipe_container");

// Hämta produktdata från API (receptet med det specifika ID:t)
fetch(`https://dummyjson.com/recipes/${myid}`)
  .then((response) => response.json()) // Konvertera svaret från API till JSON-format
  .then((data) => {
    // När data har hämtats, uppdatera HTML-koden för att visa receptet
    singlerecipeContainer.innerHTML = `
        <!-- Här skapas en div med klass "singlerecipe" som innehåller detaljer om receptet -->
        <div class="singlerecipe">
          <!-- Visa receptets namn i en h2-tagg -->
              <h2 class="recipe_name">${data.name}</h2>
              <div class="recipe_descriptions">
              <div class="rating">
<p>${data.rating} <span class="star">★</span></p>                <p>(${
      data.reviewCount
    } reviews)</p>  <!-- Visa antalet recensioner -->
              </div>
              <p>Difficulty:</strong> ${data.difficulty}</p>
              <!-- Visa den totala tillagningstiden (prepTime + cookTime) -->
              <p>Cook Time:</strong> ${
                data.cookTimeMinutes + data.prepTimeMinutes
              } min</p>
              <div class="tags">
  ${data.tags.map((tag) => `<p>${tag}</p>`).join("")}
</div>
</div>
            <!-- Visa bild på receptet, ladda den först när den behövs (lazy loading) -->
            <img src="https://cdn.dummyjson.com/recipe-images/${
              data.id
            }.webp" alt="${data.name}" loading="lazy" />

<section class="recipe_ingredients">

<ul class="recipe_ingredients">${data.ingredients
      .map((ingredients) => `<li>${ingredients}</li>`)
      .join("")}</ul>

</section>
            <!-- Sektion som innehåller all detaljerad information om receptet -->
            <section class="recipe_details">
            
              <!-- Visa instruktionerna för receptet -->
              <p class="recipe_description">${data.instructions
                // .map((instructions) => `<p>${instructions}</p>`)
                .join(" ")}</p>
              <!-- Visa svårighetsgrad för receptet -->
              
            </section>
        </div>
    `;
  });
