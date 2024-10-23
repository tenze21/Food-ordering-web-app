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
                    <button onclick="openCartDialog('${drink.images}', '${drink.title}', ${drink.price}, '${drink.description}', '${drink._id}')"><i class='bx bx-cart'></i></button> 
                </div>
                <div class="order-btn">
                    <button onclick="openOrderDialog('${drink.images}', '${drink.title}', ${drink.price}, '${drink.description}', '${drink._id}')">Order Now</button>
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

function openOrderDialog(drinkImage, drinkTitle, drinkPrice, drinkDescription, drinkId) {
  const dialog = document.createElement("dialog");
  dialog.classList.add("order-dialog");
  dialog.innerHTML = `
    <form method="dialog" onSubmit="placeOrder()">
      <div class="img-wrapper">
        <img src=${drinkImage} alt=${drinkTitle} id="drink-img"/>
      </div>
      <div class="food-info">
        <h2>${drinkTitle}</h2>
        <p>${drinkDescription}</p>
        <p hidden aria-hidden="true" id="foodPrice">${drinkPrice}</p>
      </div>
      <input type="text" id="drink-name" value="${drinkTitle}" hidden/>
      <input id="drinkId" value="${drinkId}" hidden aria-hidden="true"/>
      <div class="form-fields">
        <div class="form-field">
          <label for="quantity">Quantity:</label>
          <select id="quantity" name="quantity" required onchange="updateTotalPrice()">
            <option value="1" selected>1 (Nu. ${drinkPrice})</option>
            <option value="2">2 (Nu. ${drinkPrice * 2})</option>
            <option value="3">3 (Nu. ${drinkPrice * 3})</option>
            <option value="4">4 (Nu. ${drinkPrice * 4})</option>
            <option value="5">5 (Nu. ${drinkPrice * 5})</option>
            <option value="6">6 (Nu. ${drinkPrice * 6})</option>
            <option value="7">7 (Nu. ${drinkPrice * 7})</option>
            <option value="8">8 (Nu. ${drinkPrice * 8})</option>
          </select>
        </div>
        <div class="form-field">
          <label for="instructions">Special Instructions:</label>
          <textarea type="text" id="instructions" name="instructions"></textarea>
        </div>
        <div class="payment">
          <p>Payment:</p>
          <div class="d-flex">
            <div class="account-number">
              <p>210815175</p>
              <button data-copy="210815175" class="copy-btn" type="button" onclick="copyAccountNumber()" title="copy"><i class='bx bx-copy'></i></button>
            </div>
            <input type="number" name="journalNumber" id="journal-number" placeholder="Journal Number" required>
          </div>
        </div>
        <div class="btns">
        <button type="submit">Submit Order</button>
        <button type="button" onclick="this.closest('dialog').close()">Cancel</button>
        </div>
      </div>
      </form>
  `;
  document.body.appendChild(dialog);
  dialog.showModal();
}

function openCartDialog(
  drinkImage,
  drinkTitle,
  drinkPrice,
  drinkDescription,
  drinkId
) {
  const dialog = document.createElement("dialog");
  dialog.classList.add("order-dialog");
  dialog.innerHTML = `
    <form method="dialog" class="cart-form" onSubmit="addToCart('${drinkImage}', '${drinkTitle}', '${drinkPrice}', '${drinkDescription}', '${drinkId}', this)">
      <div class="img-wrapper">
        <img src=${drinkImage} alt=${drinkTitle}/>
      </div>
      <div class="food-info">
        <h2>${drinkTitle}</h2>
        <p>${drinkDescription}</p>
      </div>
      <div class="form-fields">
        <div class="form-field">
          <label for="quantity">Quantity:</label>
          <select id="quantity" name="quantity" required onchange="updateTotalPrice()">
            <option value="1" selected>1 (Nu. ${drinkPrice})</option>
            <option value="2">2 (Nu. ${drinkPrice * 2})</option>
            <option value="3">3 (Nu. ${drinkPrice * 3})</option>
            <option value="4">4 (Nu. ${drinkPrice * 4})</option>
            <option value="5">5 (Nu. ${drinkPrice * 5})</option>
            <option value="6">6 (Nu. ${drinkPrice * 6})</option>
            <option value="7">7 (Nu. ${drinkPrice * 7})</option>
            <option value="8">8 (Nu. ${drinkPrice * 8})</option>
          </select>
        </div>
        <div class="form-field">
          <label for="instructions">Special Instructions:</label>
          <textarea type="text" id="instructions" name="instructions"></textarea>
        </div>
        <div class="btns">
        <button type="submit">Add To Cart</button>
        <button type="button" onclick="this.closest('dialog').close()">Cancel</button>
        </div>
      </div>
      </form>
  `;
  document.body.appendChild(dialog);
  dialog.showModal();
}

function addToCart(
  drinkImage,
  drinkTitle,
  drinkPrice,
  drinkDescription,
  drinkId,
  form
) {
  const quantity = parseInt(
    form.querySelector('select[name="quantity"]').value
  );
  const instructions = form.querySelector(
    'textarea[name="instructions"]'
  ).value;
  const drinkItem = {
    type: "drink",
    id: drinkId,
    image: drinkImage,
    title: drinkTitle,
    price: drinkPrice,
    description: drinkDescription,
    quantity,
    totalPrice: drinkPrice * quantity,
    instructions,
  };

  let cart = JSON.parse(localStorage.getItem("drinkCart")) || [];
  const existingItemIndex = cart.findIndex((item) => item.id === drinkId);

  if (existingItemIndex > -1) {
    // If the item already exists in the cart, update its quantity and total price
    cart[existingItemIndex].quantity += quantity;
    cart[existingItemIndex].totalPrice += drinkPrice * quantity;
    cart[existingItemIndex].instructions = instructions; // Update instructions
  } else {
    // If the item does not exist, add it to the cart
    cart.push(drinkItem);
  }

  localStorage.setItem("drinkCart", JSON.stringify(cart));
  location.reload();
  showMessage(drinkTitle);
}
// Copy Account Number
function copyAccountNumber() {
  const copiedText = document.querySelector(".copy-btn").dataset.copy;
  navigator.clipboard.writeText(copiedText);
}

const hideAlert = () => {
  const el = document.querySelector(".message");
  if (el) el.parentElement.removeChild(el);
};

// type is success or error
const showMessage = (item) => {
  hideAlert();
  const markup = `<div class="message">${item} added to cart!</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 3000);
};

// Handle order placement
// get form data
// POST /user/order
function placeOrder() {
  const userId = document.getElementById("userId").textContent;
  const drinkId = document.getElementById("drinkId").value;
  const quantity = Number(document.getElementById("quantity").value);
  const instructions = document.getElementById("instructions").value.trim();
  const journalNumber = document.getElementById("journal-number").value.trim();
  const imagePath= document.getElementById("drink-img").src;
  const image= imagePath.substring(imagePath.indexOf("/images"));
  const price = Number(document.getElementById("foodPrice").textContent);
  const drinkName= document.getElementById("drink-name").value.trim();
  const totalPrice = quantity * price;

  const data = {
    user: userId,
    orderItems: [
      {
        type: "drink",
        _id: drinkId,
        name: drinkName,
        image: image,
        quantity: quantity,
        specialInstructions: instructions,
      },
    ],
    journalNumber: journalNumber,
    totalPrice: totalPrice,
  };

  fetch("/user/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(() => showOrderSuccess())
    .catch((err) => console.error("Error:", err));
}

const hideOrderSuccess = () => {
  const el = document.querySelector(".order-success");
  if (el) el.parentElement.removeChild(el);
};

// type is success or error
const showOrderSuccess = () => {
  hideOrderSuccess();
  const markup = `<div class="order-success">Your order has been placed successfully!</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideOrderSuccess, 3000);
};
