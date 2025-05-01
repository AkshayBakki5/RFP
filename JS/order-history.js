import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Check login status
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    return !!currentUser;
}

// Handle profile redirect
window.handleProfileRedirect = function() {
    if (checkLoginStatus()) {
        window.location.href = 'order-history.html';
    } else {
        window.location.href = 'login.html';
    }
}

// Format date to a readable string (e.g., "Apr 23, 2025")
function formatDate(isoDate) {
    if (!isoDate) return 'N/A';
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Format cart items into a readable string
function formatOrderItems(cart) {
    if (!cart || !Array.isArray(cart) || cart.length === 0) return 'No items';
    return cart
        .map(item => {
            const size = item.size ? ` (Size: ${item.size})` : '';
            const quantity = item.quantity > 1 ? ` x ${item.quantity}` : '';
            return `${item.title}${size}${quantity}`;
        })
        .join(', ');
}

// Calculate and format order total
function formatOrderTotal(cart, promoDiscount = 0) {
    if (!cart || !Array.isArray(cart)) return '$0.00';
    const subtotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', '')) || 0;
        return sum + price * (item.quantity || 1);
    }, 0);
    const total = subtotal - (promoDiscount || 0);
    return `$${total.toFixed(2)}`;
}

// Load and display order history
function loadOrderHistory() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (!user || !checkLoginStatus()) {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = localStorage.getItem('currentUser');
        const localUser = users.find(u => u.username === currentUser || u.email === user.email);
        if (!localUser) {
            window.location.href = 'login.html';
            return;
        }

        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const userOrders = orders.filter(order => order.shippingInfo.email === localUser.email || order.shippingInfo.username === currentUser);
        const tableBody = document.getElementById('order-history-table');

        if (!tableBody) {
            console.error('Order history table not found');
            return;
        }

        tableBody.innerHTML = '';
        if (userOrders.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5">No orders yet</td></tr>';
            return;
        }

        userOrders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.orderId || 'N/A'}</td>
                <td>${formatDate(order.orderDate)}</td>
                <td>${formatOrderItems(order.cart)}</td>
                <td>${formatOrderTotal(order.cart, order.promoDiscount)}</td>
                <td>${order.status || 'Pending'}</td>
            `;
            tableBody.appendChild(row);
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Immediate check for login status
    if (!checkLoginStatus()) {
        window.location.href = 'login.html';
        return;
    }
    
    loadOrderHistory();
});