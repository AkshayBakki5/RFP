function menuToggle() {
    const menuItems = document.getElementById("MenuItems");
    
    if (menuItems.style.maxHeight === "0px" || menuItems.style.maxHeight === "") {
        menuItems.style.maxHeight = "200px";
    } else {
        menuItems.style.maxHeight = "0px";
    }
}

// Search Functionality
function searchProducts() {
    const searchInput = document.getElementById("searchInput");
    const productCards = document.querySelectorAll(".col-4");
    const searchTerm = searchInput.value.toLowerCase();

    productCards.forEach(card => {
        const productName = card.querySelector("h4").textContent.toLowerCase();
        
        if (productName.includes(searchTerm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Cart Functionality
let cart = [];

function addToCart(productName, price) {
    const product = {
        name: productName,
        price: price,
        quantity: 1
    };

    cart.push(product);
    updateCartDisplay();
    saveCart();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotalElement = document.getElementById("cartTotal");
    
    if (cartItemsContainer && cartTotalElement) {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.innerHTML = `
                ${item.name} - ₹${item.price} x ${item.quantity}
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = `Total: ₹${total}`;
    }
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartDisplay();
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners
    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
        searchButton.addEventListener("click", searchProducts);
    }

    // Load cart from local storage
    loadCart();
});