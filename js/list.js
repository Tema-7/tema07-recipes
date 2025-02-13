// Hämta kategori från URL
const mycategory = new URLSearchParams(window.location.search).get("recipe_list_container");

// Hämta alla recept
const recipe_list_container = document.querySelector("#recipe_list_container");

// Hämta produkter baserat på vald kategori
fetch(`https://dummyjson.com/recipes`)
  .then((response) => response.json())
  .then((data) => showList(data.recipes));

function showList(data) {
  const markup = data
    .map(
      (recipe) =>
        `  <article class="card">
            <h2>${recipe.name}</h2>
        </article>`
    )
    .join("");

  recipe_list_container.innerHTML = markup;
}
