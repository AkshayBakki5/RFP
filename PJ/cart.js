// Cart Management Script

// Cart class to handle cart operations
class Cart {
    constructor() {
        // Initialize cart from local storage or create empty cart
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
    }

    // Add item to cart
    addItem(product) {
        // Check if product already exists in cart
        const existingProduct = this.items.find(item => item.id === product.id);
        
        if (existingProduct) {
            // If product exists, increase quantity
            existingProduct.quantity += 1;
        } else {
            // If new product, add to cart with quantity 1
            this.items.push({
                ...product,
                quantity: 1
            });
        }

        // Save updated cart to local storage
        this.saveCart();
        
        // Update cart display
        this.updateCartDisplay();
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }

    // Save cart to local storage
    saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }

    // Get total cart items
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Calculate total price
    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Update cart display (can be modified based on your cart page structure)
    updateCartDisplay() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = this.getTotalItems();
        }
    }
}

// Initialize cart
const cart = new Cart();

// Function to add product to cart
function addToCart(productElement) {
    const product = {
        id: productElement.dataset.productId,
        name: productElement.querySelector('h4').textContent,
        price: parseFloat(productElement.querySelector('p').textContent.replace('₹', '')),
        image: productElement.querySelector('img').src
    };

    cart.addItem(product);
    alert(`${product.name} added to cart!`);
}

// Add event listeners to "Add to Cart" buttons when page loads
document.addEventListener('DOMContentLoaded', () => {
    const productElements = document.querySelectorAll('.col-4');
    
    productElements.forEach(product => {
        // Add product ID for tracking
        product.dataset.productId = `product-${Math.random().toString(36).substr(2, 9)}`;
        
        // Create "Add to Cart" button
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.classList.add('btn', 'add-to-cart-btn');
        addToCartButton.addEventListener('click', () => addToCart(product));
        
        product.appendChild(addToCartButton);
    });

    // Initial cart display update
    cart.updateCartDisplay();
});