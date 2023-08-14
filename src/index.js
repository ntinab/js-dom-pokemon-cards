document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.querySelector(".cards");

  data.forEach((pokemon) => {
    const card = document.createElement("ul");
    card.className = "card";

    const title = document.createElement("h2");
    title.className = "card--title";
    title.textContent =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    card.appendChild(title);

    const image = document.createElement("img");
    image.className = "card--img";
    image.src = pokemon.sprites.front_default;
    image.setAttribute("data-current-image", "front_default"); // Initialize with default image
    card.appendChild(image);

    image.addEventListener("click", () => {
      const currentImageKey = image.getAttribute("data-current-image");
      const spriteVariations = Object.keys(pokemon.sprites);
      const currentImageIndex = spriteVariations.indexOf(currentImageKey);
      const nextImageIndex = (currentImageIndex + 1) % spriteVariations.length;
      const nextImageKey = spriteVariations[nextImageIndex];    
      image.src = pokemon.sprites[nextImageKey];
      image.setAttribute("data-current-image", nextImageKey);
    });

    const statsList = document.createElement("ul");
    statsList.className = "card--text";

    pokemon.stats.forEach((stat) => {
      const statName = stat.stat.name.toUpperCase();
      const statItem = document.createElement("ul");
      statItem.className = "card--text"
      statName.className = "card--text"
      statItem.textContent = `${statName}: ${stat.base_stat}`;
      statsList.appendChild(statItem);
    });

    card.appendChild(statsList);

    const gameInfo = document.createElement("p");
    gameInfo.className = "card--text";
    gameInfo.textContent = `Games: ${pokemon.game_indices
      .map(
        (index) =>
          index.version.name.charAt(0).toUpperCase() +
          index.version.name.slice(1)
      )
      .join(", ")}`;
    card.appendChild(gameInfo);

    cardsContainer.appendChild(card);
  });
});