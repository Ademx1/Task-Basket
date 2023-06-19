'use strict';
let quantityElements = document.getElementsByClassName('quantity');
let cartAmountElement = document.querySelector('.cartAmount');
let cartItemsContainer = document.querySelector('.cart-items');

let cartCount = 0;
let cartItems = [];
let totalPrice = 0;

function saveCartData() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('totalPrice', totalPrice.toFixed(2));
}

function loadCartData() {
  let storedCartItems = localStorage.getItem('cartItems');
  if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
    displayCartItems();
  }

  let storedTotalPrice = localStorage.getItem('totalPrice');
  if (storedTotalPrice) {
    totalPrice = parseFloat(storedTotalPrice);
    updateTotalPrice();
  }

  console.log('Loaded cartItems:', cartItems);
  console.log('Loaded totalPrice:', totalPrice);
}


window.addEventListener('load', loadCartData);

function increase(index) {
  let quantityElement = quantityElements[index];
  quantityElement.textContent = parseInt(quantityElement.textContent) + 1;

  cartCount++;
  cartAmountElement.textContent = cartCount;
}

function decrease(index) {
  let quantityElement = quantityElements[index];
  let quantity = parseInt(quantityElement.textContent);
  if (quantity > 0) {
    quantityElement.textContent = quantity - 1;

    if (cartCount > 0) {
      cartCount--;
      cartAmountElement.textContent = cartCount;
    }

    let item = cartItems[index];
    let itemPrice = item.price;

    totalPrice -= itemPrice;
    updateTotalPrice();
  }
}

function addToCart(index) {
  let item = {
    name: document.querySelectorAll('.details h3')[index].textContent,
    price: parseFloat(document.querySelectorAll('.price h2')[index].textContent.replace('$', '')),
    quantity: parseInt(quantityElements[index].textContent),
  };

  cartItems.push(item);
  console.log(`Added to cart: ${item.name} (Quantity: ${item.quantity})`);

  totalPrice += item.price * item.quantity;
  updateTotalPrice();
  displayCartItems();
  saveCartData();
}

function displayCartItems() {
  cartItemsContainer.innerHTML = '';

  cartItems.forEach((item) => {
    let cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    let itemName = document.createElement('div');
    itemName.textContent = item.name;
    itemName.classList.add('item-name');
    cartItem.appendChild(itemName);

    let itemPrice = document.createElement('div');
    itemPrice.textContent = `$${item.price.toFixed(2)}`;
    itemPrice.classList.add('item-price');
    cartItem.appendChild(itemPrice);

    let itemQuantity = document.createElement('div');
    itemQuantity.textContent = item.quantity;
    itemQuantity.classList.add('item-quantity');
    cartItem.appendChild(itemQuantity);

    cartItemsContainer.appendChild(cartItem);
  });
}

function updateTotalPrice() {
  let totalPriceElement = document.querySelector('.total-price');
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

let increaseButtons = document.querySelectorAll('.bi-plus-lg');
let decreaseButtons = document.querySelectorAll('.bi-dash');
let addToCartButtons = document.querySelectorAll('.item');

for (let i = 0; i < increaseButtons.length; i++) {
  increaseButtons[i].addEventListener('click', function () {
    increase(i);
  });
}

for (let i = 0; i < decreaseButtons.length; i++) {
  decreaseButtons[i].addEventListener('click', function () {
    decrease(i);
  });
}

for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener('click', function () {
    addToCart(i);
  });
}

let cartContainer = document.querySelector('.cart-container');

let cartIcon = document.querySelector('.bi-cart2');
cartIcon.addEventListener('click', function () {
  cartContainer.classList.toggle('show');
});

let exitButton = document.querySelector('.exit-button');

exitButton.addEventListener('click', function () {
  cartContainer.classList.remove('show');
});
