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
            <a href="/admin/food/${food._id}">
                <div class="img"><img src="${food.images}" alt="${food.title}"></div>
                <div class="details">
                    <h2 class="title">${food.title}</h2>
                    <p class="description">${food.description}</p>
                    <p class="price">Nu. ${food.price}</p>
                </div>
            </a>
            <div class="set-availability">
                <input type="checkbox" checked id="availability-setter" onChange="updateAvailability('${food._id}','${food.isAvailable}')">
            </div>
        </div>
        `;
  } else {
    wrapper.innerHTML += `
        <div class="card">
            <a href="/admin/food/${food._id}">
                <div class="img"><img src="${food.images}" alt="${food.name}"></div>
                <div class="details">
                    <h2 class="title">${food.title}</h2>
                    <p class="description">${food.description}</p>
                    <p class="price">Nu. ${food.price}</p>
                </div>
            </a>
            <div class="set-availability">
                <input type="checkbox" id="availability-setter" onChange="updateAvailability('${food._id}', '${food.isAvailable}')">
            </div>
        </div>
        `;
  }
}

function updateAvailability(id, isAvailable) {
  let data;
  if(isAvailable==='true'){
    data={isAvailable: false}
  }else{
    data= {isAvailable: true}
  }
  
  fetch(`/menu/food/availability/${id}`,{
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  }).catch(err=>{
    showUpdateError(err.message);
  })
}

const hideError = () => {
  const el = document.querySelector(".order-success");
  if (el) el.parentElement.removeChild(el);
};

// type is success or error
const showUpdateError = (message) => {
  hideError();
  const markup = `<div class="update-error">There was an error: ${message}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideError, 3000);
};