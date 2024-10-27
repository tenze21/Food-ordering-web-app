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
                <input type="checkbox" checked onChange="updateAvailability('${drink._id}', '${drink.isAvailable}')">
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
                <input type="checkbox" onChange="updateAvailability('${drink._id}', '${drink.isAvailable}')">
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
  
  fetch(`/menu/drinks/${id}`,{
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