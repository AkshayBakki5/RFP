let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

function addToCart(productId, name, price, image) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, name, price, image, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            removeFromCart(productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

function displayCart() {
    const cartTable = document.querySelector('.cart-page table');
    if (!cartTable) return;

    let html = `
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
        </tr>
    `;
    
    let subtotal = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        html += `
            <tr>
                <td>
                    <div class="cart-info">
                        <img src="${item.image}">
                        <div>
                            <p>${item.name}</p>
                            <small>Price: ₹${item.price.toFixed(2)}</small>
                            <a href="#" onclick="removeFromCart('${item.id}'); return false;">Remove</a>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity('${item.id}', this.value)"></td>
                <td>₹${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    cartTable.innerHTML = html;

    const totalPriceDiv = document.querySelector('.total-price');
    const tax = subtotal * 0.18;
    const total = subtotal + tax;
    totalPriceDiv.innerHTML = `
        <table>
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
        </table>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayCart();
});