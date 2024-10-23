const searchInput = document.getElementById("search-input");
const wrapper = document.querySelector(".menu-wrapper");

const foods = [];

// show loading while fetching data
wrapper.innerHTML = "<h1 class='no-food'>Loading...</h1>";

function getFood() {
  fetch("/menu/food")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((food) => {
        foods.push(food);
      });
      wrapper.innerHTML = "";
      foods.forEach((food) => showFood(food));
    })
    .catch((err) => {
      console.log(err);
    });
}
getFood();

// Start of Selection
searchInput.addEventListener("input", (e) => {
  const filteredFoods = foods.filter((food) =>
    food.title.toLowerCase().includes(e.target.value.toLowerCase())
  );
  if (!filteredFoods.length) {
    wrapper.innerHTML = "<h1 class='no-food'>No matching results...</h1>";
  } else {
    wrapper.innerHTML = "";
    filteredFoods.forEach((food) => showFood(food));
  }
});

function showFood(food) {
  if (food.isAvailable) {
    wrapper.innerHTML += `
        <div class="card">
            <div class="card-img">
                <img src=${food.images} alt=${food.title}/>
            </div>
            <p class="title">${food.title}</p>
            <div class="detail">
                <p class="price">Nu. ${food.price}</p>
                <div class="category">
                    <span class="${
                      food.category === "veg" ? "veg" : "non-veg"
                    }"></span>
                    <p>${food.category}</p>
                </div>
            </div>
            <div class="cta">
                <div class="cart">
                    <button onClick="openCartDialog('${food.images}', '${
      food.title
    }', ${food.price}, '${food.description}', '${
      food._id
    }')"><i class='bx bx-cart'></i></button> 
                </div>
                <div class="order-btn">
                    <button onclick="openOrderDialog('${food.images}', '${
      food.title
    }', ${food.price}, '${food.description}', '${food._id}')">Order Now</button>
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
                <img src=${food.images} alt=${food.title}/>
            </div>
            <p class="title">${food.title}</p>
            <div class="detail">
                <p class="price">Nu. ${food.price}</p>
                <div class="category">
                    <span class="${
                      food.category === "veg" ? "veg" : "non-veg"
                    }"></span>
                    <p>${food.category}</p>
                </div>
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

function openOrderDialog(
  foodImage,
  foodTitle,
  foodPrice,
  foodDescription,
  foodId
) {
  const dialog = document.createElement("dialog");
  dialog.classList.add("order-dialog");
  dialog.innerHTML = `
      <form method="dialog" class="order-form" onSubmit="placeOrder()">
      <div class="img-wrapper">
        <img src=${foodImage} alt=${foodTitle} id="food-img"/>
      </div>
      <div class="food-info">
        <h2>${foodTitle}</h2>
        <p>${foodDescription}</p>
        <p hidden aria-hidden="true" id="foodPrice">${foodPrice}</p>
      </div>
      <input type="text" id="food-name" value="${foodTitle}" hidden/>
      <input type="text" id="food-id" value="${foodId}" hidden/>
      <div class="form-fields">
        <div class="form-field">
          <label for="quantity">Quantity:</label>
          <select id="quantity" name="quantity" required onchange="updateTotalPrice()">
            <option value="1" selected>1 (Nu. ${foodPrice})</option>
            <option value="2">2 (Nu. ${foodPrice * 2})</option>
            <option value="3">3 (Nu. ${foodPrice * 3})</option>
            <option value="4">4 (Nu. ${foodPrice * 4})</option>
            <option value="5">5 (Nu. ${foodPrice * 5})</option>
            <option value="6">6 (Nu. ${foodPrice * 6})</option>
            <option value="7">7 (Nu. ${foodPrice * 7})</option>
            <option value="8">8 (Nu. ${foodPrice * 8})</option>
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
            <input type="number" id="journal-number" name="journalNumber" placeholder="Journal Number" required>
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
  foodImage,
  foodTitle,
  foodPrice,
  foodDescription,
  foodId
) {
  const dialog = document.createElement("dialog");
  dialog.classList.add("order-dialog");
  dialog.innerHTML = `
      <form method="dialog" class="food-cart-from" onSubmit="addToCart('${foodImage}', '${foodTitle}', '${foodPrice}', '${foodDescription}', '${foodId}', this)">
      <div class="img-wrapper">
      <img src=${foodImage} alt=${foodTitle}/>
      </div>
      <div class="food-info">
      <h2>${foodTitle}</h2>
      <p>${foodDescription}</p>
      </div>
      <div class="form-fields">
        <div class="form-field">
          <label for="quantity">Quantity:</label>
          <select id="quantity" name="quantity" required onchange="updateTotalPrice()">
            <option value="1" selected>1 (Nu. ${foodPrice})</option>
            <option value="2">2 (Nu. ${foodPrice * 2})</option>
            <option value="3">3 (Nu. ${foodPrice * 3})</option>
            <option value="4">4 (Nu. ${foodPrice * 4})</option>
            <option value="5">5 (Nu. ${foodPrice * 5})</option>
            <option value="6">6 (Nu. ${foodPrice * 6})</option>
            <option value="7">7 (Nu. ${foodPrice * 7})</option>
            <option value="8">8 (Nu. ${foodPrice * 8})</option>
          </select>
        </div>
        <div class="form-field">
          <label for="instructions">Special Instructions:</label>
          <textarea type="text" id="instructions" name="instructions"></textarea>
        </div>
        <div class="btns">
        <button type="submit">Add To cart</button>
        <button type="button" onclick="this.closest('dialog').close()">Cancel</button>
        </div>
      </div>
      </form>
    `;
  document.body.appendChild(dialog);
  dialog.showModal();
}

function addToCart(
  foodImage,
  foodTitle,
  foodPrice,
  foodDescription,
  foodId,
  form
) {
  const quantity = parseInt(
    form.querySelector('select[name="quantity"]').value
  );
  const instructions = form.querySelector(
    'textarea[name="instructions"]'
  ).value;
  const foodItem = {
    type:"food",
    id: foodId,
    image: foodImage,
    title: foodTitle,
    price: foodPrice,
    description: foodDescription,
    quantity,
    totalPrice: foodPrice * quantity,
    instructions,
  };

  let cart = JSON.parse(localStorage.getItem("foodCart")) || [];
  const existingItemIndex = cart.findIndex((item) => item.id === foodId);

  if (existingItemIndex > -1) {
    // If the item already exists in the cart, update its quantity and total price
    cart[existingItemIndex].quantity += quantity;
    cart[existingItemIndex].totalPrice += foodPrice * quantity;
    cart[existingItemIndex].instructions = instructions; // Update instructions
  } else {
    cart.push(foodItem);
  }

  localStorage.setItem("foodCart", JSON.stringify(cart));
  location.reload();
  showMessage(foodTitle);
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
function placeOrder(){
  const quantity = Number(document.getElementById("quantity").value);
  const instructions = document.getElementById("instructions").value.trim();
  const journalNumber = document.getElementById("journal-number").value.trim();
  const imagePath= document.getElementById("food-img").src;
  const image= imagePath.substring(imagePath.indexOf("/images"));
  const price = Number(document.getElementById("foodPrice").textContent);
  const foodName= document.getElementById("food-name").value.trim();
  const foodId= document.getElementById("food-id").value.trim();
  const totalPrice = quantity * price;

  const data = {
    orderItems: [
      {
        type: "food",
        _id: foodId,
        name: foodName,
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
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  }).then(()=>showOrderSuccess())
  .catch(err=>console.error("Error:", err));
};

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
