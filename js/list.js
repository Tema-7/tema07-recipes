// Hämta alla recept
const recipe_list_container = document.querySelector("#recipe_list_container");

// Hämta recept från URL
const myrecipe = new URLSearchParams(window.location.search).get("recipe_list_container");

// Hämta recept
fetch(`https://dummyjson.com/recipes`)
  .then((response) => response.json())
  .then((data) => showList(data.recipes));

function showList(data) {
  const markup = data
    .map(
      (recipe) =>
        `  <article class="card">
            <h2>${recipe.name}</h2>
                        <a href="detaljer.html?id=${recipe.id}">
            <img src="https://cdn.dummyjson.com/recipe-images/${recipe.id}.webp" alt="${recipe.name}" loading="lazy" />
            </a>
  <div class="rating">
            <p>${recipe.rating}</p>
            <p>(${recipe.reviewCount} reveiws)</p>
</div>
<p>Cooking Time: <span>${recipe.cookTimeMinutes + recipe.prepTimeMinutes}</span> min</p>
<p>Difficulty: ${recipe.difficulty}</p>
<div class="tags">
            <p>${recipe.tags}</p>
</div>

        </article>`
    )
    .join("");

  recipe_list_container.innerHTML = markup;
}
