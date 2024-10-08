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
            <div class="card-img">
                <img src=${drink.images} alt=${drink.title}/>
            </div>
            <p class="title">${drink.title}</p>
            <div class="detail">
                <p class="price">Nu. ${drink.price}</p>
            </div>
            <div class="cta">
                <div class="cart">
                    <button><i class='bx bx-cart'></i></button> 
                </div>
                <div class="order-btn">
                    <button onclick="openOrderDialog('${drink.images}', '${drink.title}', ${drink.price})">Order Now</button>
                </div>
            </div>
        </div>
        `;
  } else {
    wrapper.innerHTML += `
        <div class="card unavailable">
            <div class="overlay"></div>
            <p class="unavailable-text">Unavailable</p>
            <div class="card-img">
                <img src=${drink.images} alt=${drink.title}/>
            </div>
            <p class="title">${drink.title}</p>
            <div class="detail">
                <p class="price">Nu. ${drink.price}</p>
            </div>
            <div class="cta">
                <div class="cart">
                    <button disabled><i class='bx bx-cart'></i></button> 
                </div>
                <div class="order-btn">
                    <button disabled>Order Now</button>
                </div>
            </div>
        </div>
        `;
  }
}

function openOrderDialog(drinkImage, drinkTitle, drinkPrice) {
  const dialog = document.createElement('dialog');
  dialog.innerHTML = `
    <form method="dialog">
      <h2>Order ${drinkTitle}</h2>
      <div class="img-wrapper">
        <img src=${drinkImage} alt=${drinkTitle}/>
      </div>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <label for="quantity">Quantity:</label>
      <input type="number" id="quantity" name="quantity" min="1" required>
      <label for="address">Delivery Address:</label>
      <input type="text" id="address" name="address" required>
      <p>Total Price: Nu. ${drinkPrice}</p>
      <button type="submit">Submit Order</button>
      <button type="button" onclick="this.closest('dialog').close()">Cancel</button>
    </form>
  `;
  document.body.appendChild(dialog);
  dialog.showModal();
}