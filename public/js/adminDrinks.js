const searchInput = document.getElementById("search-input");
const wrapper = document.querySelector(".menu-wrapper");

const drinks = [];

// show loading while fetching data
wrapper.innerHTML = "<h1 class='no-food'>Loading...</h1>";

function getDrinks() {
    fetch("/menu/drinks")
    .then((res) => res.json())
    .then((data) => {
        data.forEach((drink) => {
            drinks.push(drink);
        });
        wrapper.innerHTML = "";
      drinks.forEach((drink) => showDrink(drink));
    })
    .catch((err) => {
      console.log(err);
    });
}
getDrinks();

// Start of Selection
searchInput.addEventListener("input", (e) => {
  const filteredDrinks = drinks.filter((drink) =>
    drink.title.toLowerCase().includes(e.target.value.toLowerCase())
  );
  if (!filteredDrinks.length) {
    wrapper.innerHTML = "<h1 class='no-food'>No matching results...</h1>";
  } else {
    wrapper.innerHTML = "";
    filteredDrinks.forEach((drink) => showDrink(drink));
  }
});

function showDrink(drink) {
  if (drink.isAvailable) {
    wrapper.innerHTML += `
        <div class="card">
            <a href="/admin/drinks/${drink._id}">
                <div class="img"><img src="${drink.images}" alt="${drink.title}"></div>
                <div class="details">
                    <h2 class="title">${drink.title}</h2>
                    <p class="description">${drink.description}</p>
                    <p class="price">Nu. ${drink.price}</p>
                </div>
            </a>
            <div class="set-availability">
                <input type="checkbox" checked>
            </div>
        </div>
        `;
  } else {
    wrapper.innerHTML += `
        <div class="card">
            <a href="/admin/drinks/${drink._id}">
                <div class="img"><img src="${drink.images}" alt="${drink.name}"></div>
                <div class="details">
                    <h2 class="title">${drink.title}</h2>
                    <p class="description">${drink.description}</p>
                    <p class="price">Nu. ${drink.price}</p>
                </div>
            </a>
            <div class="set-availability">
                <input type="checkbox">
            </div>
        </div>
        `;
  }
}
