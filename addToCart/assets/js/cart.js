const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.querySelector("#cartContainer");
const counter = document.querySelector("#cartCounter");
const netTotal = document.querySelector("#netTotal");

function updateCounter() {
    counter.textContent = cart.length;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function increaseQty(id) {
    let item = cart.find(p => p.id === id);
    item.quantity++;
    saveCart();
}

function decreaseQty(id) {
    let item = cart.find(p => p.id === id);
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        let idx = cart.findIndex(p => p.id === id);
        cart.splice(idx, 1);
    }
    saveCart();
}

function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach(product => {
        let itemTotal = product.price * product.quantity;
        total += itemTotal;

        cartContainer.innerHTML += `
        <div class="row align-items-center my-3">
            <div class="col-2">
                <img src="${product.imageURL}" class="img-fluid">
            </div>

            <div class="col-4">
                <h4>${product.name}</h4>
            </div>

            <div class="col-3">
                <div class="d-flex">
                    <button class="btn btn-primary btn-sm" onclick="decreaseQty(${product.id})">-</button>

                    <p class="mx-4 mb-0 fs-5">${product.quantity}</p>

                    <button class="btn btn-primary btn-sm" onclick="increaseQty(${product.id})">+</button>
                </div>
            </div>

            <div class="col-3 d-flex justify-content-between">
                <p class="mb-0">$${product.price}</p>
                <h4 class="text-danger mb-0">$${itemTotal.toFixed(2)}</h4>
            </div>
        </div>
        `;
    });

    netTotal.textContent = `$${total.toFixed(2)}`;
    updateCounter();
}

document.addEventListener("DOMContentLoaded", renderCart);
