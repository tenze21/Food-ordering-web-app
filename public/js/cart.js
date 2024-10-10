const cart=document.querySelector('.cart');
const home=document.querySelector('.home');

home.removeAttribute('aria-current');
cart.setAttribute('aria-current','page');


const foodsContainer=document.querySelector('.foods-container');
const drinksContainer=document.querySelector('.drinks-container');

const foods=localStorage.getItem('foodCart')?JSON.parse(localStorage.getItem('foodCart')):[];
const drinks=localStorage.getItem('drinkCart')?JSON.parse(localStorage.getItem('drinkCart')):[];

function removeItemFromCart(itemType, index) {
    if (itemType === 'food') {
        foods.splice(index, 1);
        localStorage.setItem('foodCart', JSON.stringify(foods));
        showFoods(foods);
    } else if (itemType === 'drink') {
        drinks.splice(index, 1);
        localStorage.setItem('drinkCart', JSON.stringify(drinks));
        showDrinks(drinks);
    }
    updateCartDisplay();
    updateTotalPrice();
}

function updateCartDisplay(){
    if(drinks.length<=0 && foods.length<=0){
        document.querySelector('.checkout-btn').setAttribute('disabled','');
    }else{
        document.querySelector('.checkout-btn').removeAttribute('disabled');
    }
}

function showFoods(foods) {
    foodsContainer.innerHTML = '';
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

    foodsContainer.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            removeItemFromCart('food', index);
        });
    });
}

if(foods.length>0){
    foodsContainer.querySelector('.empty-cart').style.display='none';
    showFoods(foods);
}

function showDrinks(drinks) {
    drinksContainer.innerHTML = '';
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

    drinksContainer.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            removeItemFromCart('drink', index);
        });
    });
}

if(drinks.length>0){
    drinksContainer.querySelector('.empty-cart').style.display='none';
    showDrinks(drinks);
}

if(drinks.length<=0 && foods.length<=0){
    document.querySelector('.checkout-btn').setAttribute('disabled','');
};

const payment=document.querySelector('.total-payment');

function updateTotalPrice(){
    let total=0;
    foods.forEach(food => {
        total+=food.totalPrice;
    });
    drinks.forEach(drink => {
        total+=drink.totalPrice;
    });
    payment.textContent=total;
    // console.log(total);
}

updateTotalPrice();
