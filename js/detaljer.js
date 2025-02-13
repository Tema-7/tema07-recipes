// Hämta produktens ID från URL
const myid = new URLSearchParams(window.location.search).get("id");
const singlerecipeContainer = document.querySelector("#singlerecipe_container");

// Hämta produktdata från API
fetch(`https://dummyjson.com/recipes/${myid}`)
  .then((response) => response.json())
  .then((data) => {
    // Uppdatera HTML med produktens information
    singlerecipeContainer.innerHTML = `
        <div class="singlerecipe">
            <img src="https://cdn.dummyjson.com/recipe-images/${data.id}.webp" alt="${data.name}" />

            <section class="recipe_details">
              <h2 class="recipe_name">${data.name}</h2>
              <p class="recipe_description">${data.instructions}</p>
              <p><strong>Difficulty:</strong> ${data.difficulty}</p>
              <p><strong>Cook Time:</strong> ${data.cookTimeMinutes + data.prepTimeMinutes} min</p>
            </section>
        </div>
    `;
  });
