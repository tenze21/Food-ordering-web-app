const cart = document.querySelector(".cart");
const home = document.querySelector(".home");

home.removeAttribute("aria-current");
cart.setAttribute("aria-current", "page");

const foodsContainer = document.querySelector(".foods-container");
const drinksContainer = document.querySelector(".drinks-container");

const foods = localStorage.getItem("foodCart")
  ? JSON.parse(localStorage.getItem("foodCart"))
  : [];
const drinks = localStorage.getItem("drinkCart")
  ? JSON.parse(localStorage.getItem("drinkCart"))
  : [];

function removeItemFromCart(itemType, index) {
  if (itemType === "food") {
    foods.splice(index, 1);
    localStorage.setItem("foodCart", JSON.stringify(foods));
    showFoods(foods);
  } else if (itemType === "drink") {
    drinks.splice(index, 1);
    localStorage.setItem("drinkCart", JSON.stringify(drinks));
    showDrinks(drinks);
  }
  updateCartDisplay();
  updateTotalPrice();
  location.reload();
}

function updateCartDisplay() {
  if (drinks.length <= 0 && foods.length <= 0) {
    document.querySelector(".checkout-btn").setAttribute("disabled", "");
  } else {
    document.querySelector(".checkout-btn").removeAttribute("disabled");
  }
}

function showFoods(foods) {
  foodsContainer.innerHTML = "";
  foods.forEach((food, index) => {
    foodsContainer.innerHTML += `
        <div class="card">
            <div class="card-body">
                <p class="quantity">${food.quantity}</p>
                <p class="title">${food.title}</p>
                <p class="total-price">Nu. ${food.totalPrice}</p>
            </div>
            <div class="card-footer">
                <button class="edit-btn">Edit</button>
                <button class="remove-btn" data-index="${index}" data-type="food">Remove</button>
            </div>
        </div>
        <hr/>
        `;
  });

  foodsContainer.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      removeItemFromCart("food", index);
    });
  });
}

if (foods.length > 0) {
  foodsContainer.querySelector(".empty-cart").style.display = "none";
  showFoods(foods);
}

function showDrinks(drinks) {
  drinksContainer.innerHTML = "";
  drinks.forEach((drink, index) => {
    drinksContainer.innerHTML += `
        <div class="card">
            <div class="card-body">
                <p class="quantity">${drink.quantity}</p>
                <p class="title">${drink.title}</p>
                <p class="total-price">Nu. ${drink.totalPrice}</p>
            </div>
            <div class="card-footer">
                <button class="edit-btn">Edit</button>
                <button class="remove-btn" data-index="${index}" data-type="drink">Remove</button>
            </div>
        </div>
        <hr/>
        `;
  });

  drinksContainer.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      removeItemFromCart("drink", index);
    });
  });
}

if (drinks.length > 0) {
  drinksContainer.querySelector(".empty-cart").style.display = "none";
  showDrinks(drinks);
}

if (drinks.length <= 0 && foods.length <= 0) {
  document.querySelector(".checkout-btn").setAttribute("disabled", "");
}

const payment = document.querySelector(".total-payment");

// Get and update the total price of items in cart.
let amountToBePaid;
function updateTotalPrice() {
  let total = 0;
  foods.forEach((food) => {
    total += food.totalPrice;
  });
  drinks.forEach((drink) => {
    total += drink.totalPrice;
  });
  payment.textContent = total;
  amountToBePaid = total;
}

updateTotalPrice();

// Copy Account Number from checkout modal
function copyAccountNumber() {
  const copiedText = document.querySelector(".copy-btn").dataset.copy;
  navigator.clipboard.writeText(copiedText);
}

// show checkout model for cart
const checkoutBtn = document.querySelector(".checkout-btn");
const checkoutModal = document.querySelector(".checkout-modal");
const closeModalBtn = document.querySelector(".modal-close");

checkoutBtn.addEventListener("click", () => {
  checkoutModal.showModal();
});
closeModalBtn.addEventListener("click", () => {
  checkoutModal.close();
});

// Handle checkout form submission
const form = document.getElementById("checkout-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const orderBtn = document.querySelector(".order-btn");
  orderBtn.setAttribute("disabled", "");
  orderBtn.textContent = "Processing...";
  orderBtn.classList.add("clicked");

  const journalNumber = document.getElementById("journalNumber").value.trim();
  const orderItems = [];
  foods.forEach((food) => {
    const item = {
      type: "food",
      _id: food.id,
      name: food.title,
      image: food.image,
      quantity: food.quantity,
      specialInstructions: food.instructions,
    };
    orderItems.push(item);
  });
  drinks.forEach((drink) => {
    const item = {
      type: "drink",
      _id: drink.id,
      name: drink.title,
      image: drink.image,
      quantity: drink.quantity,
      specialInstructions: drink.instructions,
    };
    orderItems.push(item);
  });
  const totalPrice = amountToBePaid;

  const data = {
    orderItems,
    journalNumber,
    totalPrice,
  };

  fetch("/user/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(() => {
      checkoutModal.close();
      showOrderSuccess();
      orderBtn.removeAttribute("disabled");
      orderBtn.textContent = "Place Order";
      orderBtn.classList.remove("clicked");
      document.getElementById("journalNumber").value="";
    })
    .catch((err) => console.error("Error:", err));
});

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
