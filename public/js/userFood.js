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
                    <button><i class='bx bx-cart'></i></button> 
                </div>
                <div class="order-btn">
                    <button onclick="openOrderDialog('${food.images}', '${
      food.title
    }', ${food.price}, '${food.description}')">Order Now</button>
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

function openOrderDialog(foodImage, foodTitle, foodPrice, foodDescription) {
  const dialog = document.createElement("dialog");
  dialog.innerHTML = `
      <form method="dialog">
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
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
        <div class="form-field">
          <label for="instructions">Special Instructions:</label>
          <textarea type="text" id="instructions" name="instructions" required></textarea>
        </div>
        <p id="total-price"></p>
        <button type="submit">Submit Order</button>
        <button type="button" onclick="this.closest('dialog').close()">Cancel</button>
      </div>
      <script>
        function updateTotalPrice() {
          const quantity = document.getElementById('quantity').value;
          const totalPrice = quantity * ${foodPrice};
          document.getElementById('total-price').innerText = 'Total Price: Nu. ' + totalPrice;
        }
      </script>
      </form>
    `;
  document.body.appendChild(dialog);
  dialog.showModal();
}
