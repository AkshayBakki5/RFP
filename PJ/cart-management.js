// Cart Management Script

class Cart {
    constructor() {
        // Initialize cart from local storage or create empty cart
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
    }

    // Add item to cart
    addItem(product, quantity = 1) {
        // Check if product already exists in cart
        const existingProductIndex = this.items.findIndex(item => item.id === product.id);
        
        if (existingProductIndex > -1) {
            // If product exists, increase quantity
            this.items[existingProductIndex].quantity += quantity;
        } else {
            // If new product, add to cart with specified quantity
            this.items.push({
                ...product,
                quantity: quantity
            });
        }

        // Save updated cart to local storage
        this.saveCart();
        
        // Update cart display
        this.updateCartDisplay();

        // Show added to cart notification
        this.showNotification(`${product.name} added to cart`);
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }

    // Update item quantity
    updateItemQuantity(productId, quantity) {
        const productIndex = this.items.findIndex(item => item.id === productId);
        if (productIndex > -1) {
            if (quantity > 0) {
                this.items[productIndex].quantity = quantity;
            } else {
                this.items.splice(productIndex, 1);
            }
            this.saveCart();
            this.updateCartDisplay();
        }
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

    // Update cart display 
    updateCartDisplay() {
        // Update cart count in navigation
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = this.getTotalItems();
        }

        // Update cart page if on cart page
        this.renderCartPage();
    }

    // Render cart page details
    renderCartPage() {
        const cartTableBody = document.querySelector('.cart-page table tbody');
        const cartTotalElement = document.querySelector('.total-price');

        if (cartTableBody && cartTotalElement) {
            // Clear existing cart items
            cartTableBody.innerHTML = '';

            // Populate cart items
            this.items.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <div class="cart-info">
                            <img src="${item.image}">
                            <div>
                                <p>${item.name}</p>
                                <small>Price: ₹${item.price.toFixed(2)}</small>
                                <a href="#" onclick="cart.removeItem(${item.id}); return false;">Remove</a>
                            </div>
                        </div>
                    </td>
                    <td>
                        <input type="number" value="${item.quantity}" 
                               min="1" 
                               onchange="cart.updateItemQuantity(${item.id}, this.value)">
                    </td>
                    <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                `;
                cartTableBody.appendChild(row);
            });

            // Update total price
            const subtotal = this.getTotalPrice();
            const tax = subtotal * 0.18;
            const total = subtotal + tax;

            cartTotalElement.querySelector('table').innerHTML = `
                <tr>
                    <td>Subtotal</td>
                    <td>₹${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Tax (18%)</td>
                    <td>₹${tax.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>₹${total.toFixed(2)}</td>
                </tr>
            `;
        }
    }

    // Show notification
    showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }

    // Clear entire cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartDisplay();
    }
}

// Initialize cart globally
const cart = new Cart();

// Function to add product to cart from product listing
function addToCart(productElement) {
    // Extract product details
    const product = {
        id: productElement.dataset.productId,
        name: productElement.querySelector('h4').textContent,
        price: parseFloat(productElement.querySelector('p').textContent.replace('₹', '')),
        image: productElement.querySelector('img').src
    };

    // Add to cart
    cart.addItem(product);
}

// Add event listeners to products when page loads
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

// Checkout function (placeholder)
function checkout() {
    alert('Proceeding to checkout...');
    // Implement actual checkout logic
}