import { formatPrice } from './utils.js';
import { allProducts } from './shoe-script.js';

let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.setAttribute('aria-label', `Cart contains ${cartCount.textContent} items`);
    }
}

export function addToCart(product, size = null, quantity = 1, checkLoginStatus) {
    if (!checkLoginStatus()) {
        alert('Please log in to add items to your cart.');
        window.location.href = 'login.html';
        return;
    }
    if (product.stock < quantity) {
        alert(`Sorry, only ${product.stock} units of ${product.name} are in stock.`);
        return;
    }
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    if (existingItem) {
        if (existingItem.quantity + quantity > product.stock) {
            alert(`Cannot add more than ${product.stock} units of ${product.name} to cart.`);
            return;
        }
        existingItem.quantity += parseInt(quantity);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice || product.price * 0.8,
            size,
            quantity: parseInt(quantity),
            image: product.images ? product.images[0] : product.image
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name}${size ? ' (Size: ' + size + ')' : ''} added to cart!`);
}

export function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

export function updateCartQuantity(index, quantity) {
    const product = allProducts.find(p => p.id === cart[index].id) || { stock: 10 };
    quantity = parseInt(quantity);
    if (quantity > product.stock) {
        alert(`Cannot add more than ${product.stock} units of ${cart[index].name} to cart.`);
        cart[index].quantity = product.stock;
    } else if (quantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

export function displayCart() {
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
    cart.forEach((item, index) => {
        const itemTotal = item.discountPrice * item.quantity;
        subtotal += itemTotal;
        html += `
            <tr>
                <td>
                    <div class="cart-info">
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <p>${item.name}${item.size ? ' (Size: ' + item.size + ')' : ''}</p>
                            <small>Price: ${formatPrice(item.discountPrice)}</small>
                            <a href="#" onclick="removeFromCart(${index}); return false;" aria-label="Remove ${item.name} from cart">Remove</a>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity(${index}, this.value)" aria-label="Quantity for ${item.name}"></td>
                <td>${formatPrice(itemTotal)}</td>
            </tr>
        `;
    });

    cartTable.innerHTML = html;

    const totalPriceDiv = document.querySelector('.total-price');
    const cartDiscount = subtotal * 0.10;
    const tax = (subtotal - cartDiscount) * 0.18;
    const total = subtotal - cartDiscount + tax;
    totalPriceDiv.innerHTML = `
        <table>
            <tr>
                <td>Subtotal</td>
                <td>${formatPrice(subtotal)}</td>
            </tr>
            <tr>
                <td>Cart Discount (10%)</td>
                <td>-${formatPrice(cartDiscount)}</td>
            </tr>
            <tr>
                <td>Tax (18%)</td>
                <td>${formatPrice(tax)}</td>
            </tr>
            <tr>
                <td>Total</td>
                <td>${formatPrice(total)}</td>
            </tr>
        </table>
    `;
}

export async function completeOrder() {
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
    const paymentInfo = JSON.parse(localStorage.getItem('paymentInfo'));
    const orderDetails = {
        cart: [...cart],
        shippingInfo,
        paymentInfo,
        orderDate: new Date().toISOString(),
        orderId: 'SSS' + Math.floor(Math.random() * 1000000),
        status: 'Pending'
    };

    // Save to orders in localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderDetails);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Update stock (simulated)
    for (const item of cart) {
        try {
            const response = await fetch('/api/update-stock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: item.id, quantity: item.quantity })
            });
            if (!response.ok) throw new Error('Stock update failed');
        } catch (error) {
            console.error('Stock update error:', error.message);
            alert('Order placed, but stock update failed. Contact support.');
        }
    }

    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.removeItem('shippingInfo');
    localStorage.removeItem('paymentInfo');
    localStorage.removeItem('promoDiscount');
    updateCartCount();
    alert(`Order ${orderDetails.orderId} placed successfully!`);
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayCart();
});