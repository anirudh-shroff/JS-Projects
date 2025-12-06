const listing = [
    {
        id: 1,
        name: "Marmont Gold Tone Ring",
        dsc: "sterling silver earring",
        price: "76.00",
        imageURL: "./assets/images/01.jpg"
    },
    {
        id: 2,
        name: "Pop Gold Baselight",
        dsc: "Gold vermeil, pearl",
        price: "19.00",
        imageURL: "./assets/images/02.jpg"
    },
    {
        id: 3,
        name: "Diamond Vintage Ring",
        dsc: "14k yellow gold",
        price: "19.00",
        imageURL: "./assets/images/03.jpg"
    },
    {
        id: 4,
        name: "Amber Earrings Close-up",
        dsc: "Gold vermeil, white topaz",
        price: "23.00",
        imageURL: "./assets/images/04.jpg"
    },
    {
        id: 5,
        name: "Gold Malachite Earrings",
        dsc: "Sterling silver earrings",
        price: "19.00",
        imageURL: "./assets/images/05.jpg"
    },
    {
        id: 6,
        name: "Gold Jwellery Baselight",
        dsc: "14k yellow gold",
        price: "16.00",
        imageURL: "./assets/images/06.jpg"
    },
    {
        id: 7,
        name: "Prong Diamond Ring",
        dsc: "Gold vermeil, pearl",
        price: "102.00",
        imageURL: "./assets/images/07.jpg"
    },
    {
        id: 8,
        name: "Malachite Earrings",
        dsc: "14k yellow gold",
        price: "123.00",
        imageURL: "./assets/images/08.jpg"
    }
]

// component trial
const navigation = document.querySelector("#navigation")


const productList = document.querySelector("#productList");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const counter = document.querySelector("#cartCounter");

const updateCounter = () => {
    counter.innerHTML = cart.length;
}

const addToCart = (productID) => {
    let product = listing.find(pro => pro.id == productID);

    let idx = cart.findIndex(pro => pro.id == productID);

    if (idx === -1) {
        product.quantity = 1;
        cart.push(product);
    } else {
        cart[idx].quantity++;
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    updateCounter();
}

listing.forEach((product, idx) => {
    productList.innerHTML += `
                <div class="col-3">
                    <div class="card border-0 prod" style="width: 18rem;">
                        <img src="${product.imageURL}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.dsc}</p>
                                <p>$${product.price}</>
                            <button href="#" class="btn btn-primary" onclick="addToCart(${product.id})" ><i class="ri-shopping-cart-2-line"></i></button>
                        </div>
                    </div>
                </div>`
})

updateCounter();