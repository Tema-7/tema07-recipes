fetch("https://dummyjson.com/recipes")
  .then((response) => response.json())
  .then((data) => {
    const opskrifter = data.recipes; // API'en returnerer data i en 'recipes' key
    const ugensOpskrift = opskrifter.reduce((højst, opskrift) => (opskrift.rating > højst.rating ? opskrift : højst), opskrifter[0]);

    document.getElementById("ugens-opskrift").innerHTML = `
        <section class="ungens-opskrift_grid">
        <h1>Lækre Opskrifter til et stramt budget</h1>         
            <div class="opskrift_container">
                <img src="arbejdsfiler/index.webp" alt="${ugensOpskrift.name}" width="200">
                <div class="ugens-opskrift-knap">
                    <a id="ugens-opskrift-knap" href="detaljer.html?id=16">Ugens opskrift</a>
                </div>
                </div>
                             
<a href="detaljer.html?id=16">
    <img class="tilbudsstjerne" src="arbejdsfiler/tillbudsstar.svg" alt="Stjerne med tekst">
</a>

        </section>
    `;
  })
  .catch((error) => console.error("Fejl ved hentning af data:", error));

document.querySelectorAll(".indexcard").forEach((card) => {
  card.addEventListener("click", function () {
    const recipeId = this.getAttribute("data-id");
    window.location.href = `detaljer.html?id=${recipeId}`;
  });
});
