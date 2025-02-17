fetch("https://dummyjson.com/recipes")
  .then((response) => response.json())
  .then((data) => {
    const opskrifter = data.recipes; // API'en returnerer data i en 'recipes' key
    const ugensOpskrift = opskrifter.reduce((højst, opskrift) => (opskrift.rating > højst.rating ? opskrift : højst), opskrifter[0]);

    document.getElementById("ugens-opskrift").innerHTML = `
        <section class="ungens-opskrift_grid">
        <h1>Lækre Opskrifter til et stramt budget</h1>         
            <div class="opskrift_container">
                <img src="${ugensOpskrift.image}" alt="${ugensOpskrift.name}" width="200">
                <div class="ugens-opskrift-knap">
                    <a id="ugens-opskrift-knap" href="index.html">Ugens opskrift</a>
                </div>
               <img class="tilbudsstjerne" src="imgs/tilbudsstjerne.png" alt="Stjerne med tekst">
            </div>
        </section>
    `;
  })
  .catch((error) => console.error("Fejl ved hentning af data:", error));
