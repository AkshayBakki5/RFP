function sanitizeInput(input) {
    return input.replace(/[<>&"']/g, '');
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function checkLoginStatus() {
    return !!localStorage.getItem('currentUser');
}

function formatDate(isoDate) {
    if (!isoDate) return 'N/A';
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

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

function formatOrderTotal(cart, promoDiscount = 0) {
    if (!cart || !Array.isArray(cart)) return '$0.00';
    const subtotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', '')) || 0;
        return sum + price * (item.quantity || 1);
    }, 0);
    const total = subtotal - (promoDiscount || 0);
    return `$${total.toFixed(2)}`;
}

function loadUserProfile() {
    if (!checkLoginStatus()) {
        window.location.href = 'login.html';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = localStorage.getItem('currentUser');
    const user = users.find(u => u.username === currentUser);

    if (user) {
        document.getElementById('displayUsername').textContent = user.username || 'N/A';
        document.getElementById('displayEmail').textContent = user.email || 'N/A';
        document.getElementById('displayPhone').textContent = user.phone || 'N/A';
        document.getElementById('displayAddress1').textContent = user.address || 'N/A';
        document.getElementById('displayAddress2').textContent = user.address2 || 'N/A';
        document.getElementById('displayCity').textContent = user.city || 'N/A';
        document.getElementById('displayState').textContent = user.state || 'N/A';
        document.getElementById('displayZip').textContent = user.zip || 'N/A';
    } else {
        document.getElementById('displayUsername').textContent = 'N/A';
        document.getElementById('displayEmail').textContent = 'N/A';
        document.getElementById('displayPhone').textContent = 'N/A';
        document.getElementById('displayAddress1').textContent = 'N/A';
        document.getElementById('displayAddress2').textContent = 'N/A';
        document.getElementById('displayCity').textContent = 'N/A';
        document.getElementById('displayState').textContent = 'N/A';
        document.getElementById('displayZip').textContent = 'N/A';
    }
}

function loadOrderHistory() {
    if (!checkLoginStatus()) {
        window.location.href = 'login.html';
        return;
    }

    const currentUser = localStorage.getItem('currentUser');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = orders.filter(order => order.userId === currentUser);
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
            <td>${order.orderId}</td>
            <td>${formatDate(order.orderDate)}</td>
            <td>${formatOrderItems(order.cart)}</td>
            <td>${formatOrderTotal(order.cart, order.promoDiscount)}</td>
            <td>${order.status || 'Pending'}</td>
        `;
        tableBody.appendChild(row);
    });
}

function handleRegister(event) {
    event.preventDefault();
    const username = sanitizeInput(document.getElementById('reg-username').value.trim());
    const email = sanitizeInput(document.getElementById('reg-email').value.trim());
    const password = document.getElementById('reg-password').value;

    if (!validatePassword(password)) {
        alert('Password must be at least 8 characters with uppercase, lowercase, numbers, and special characters.');
        return;
    }

    document.getElementById('loader').style.display = 'block';
    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.username === username)) {
        alert('Username already exists.');
        document.getElementById('loader').style.display = 'none';
        return;
    }

    if (users.some(user => user.email === email)) {
        alert('Email already registered.');
        document.getElementById('loader').style.display = 'none';
        return;
    }

    users.push({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
        phone: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: ''
    });

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', username);
    alert('Registration successful!');
    document.getElementById('RegForm').reset();
    document.getElementById('loader').style.display = 'none';
    window.location.href = 'order-history.html';
}

function handleLogin(event) {
    event.preventDefault();
    const username = sanitizeInput(document.getElementById('login-username').value.trim());
    const password = document.getElementById('login-password').value;

    document.getElementById('loader').style.display = 'block';
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        alert('Invalid username or password.');
        document.getElementById('loader').style.display = 'none';
        return;
    }

    localStorage.setItem('currentUser', username);
    alert('Login successful!');
    document.getElementById('LoginForm').reset();
    document.getElementById('loader').style.display = 'none';
    window.location.href = 'order-history.html';
}

function handlePasswordReset(event) {
    event.preventDefault();
    alert('Password reset is not supported in this demo. Please contact support.');
}

function logout() {
    document.getElementById('loader').style.display = 'block';
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('promoDiscount');
    
    updateNavbar();
    alert('Logged out successfully.');
    document.getElementById('loader').style.display = 'none';
    window.location.href = 'login.html';
}

function updateNavbar() {
    const profileLink = document.getElementById('profile-link');
    const logoutLink = document.getElementById('logout-link');
    const currentUser = localStorage.getItem('currentUser');

    if (profileLink && logoutLink) {
        if (currentUser) {
            profileLink.innerHTML = `<a href="order-history.html">Welcome, ${currentUser}</a>`;
            logoutLink.style.display = 'inline-block';
        } else {
            profileLink.innerHTML = `<a href="login.html">Login / Register</a>`;
            logoutLink.style.display = 'none';
        }
    }
}

function showLogin() {
    document.getElementById('LoginForm').style.display = 'block';
    document.getElementById('RegForm').style.display = 'none';
    document.getElementById('Indicator').style.transform = 'translateX(0)';
}

function showRegister() {
    document.getElementById('LoginForm').style.display = 'none';
    document.getElementById('RegForm').style.display = 'block';
    document.getElementById('Indicator').style.transform = 'translateX(120px)';
}

window.logout = logout;
window.checkLoginStatus = checkLoginStatus;
window.handleProfileRedirect = () => {
    if (checkLoginStatus()) {
        window.location.href = 'order-history.html';
    } else {
        window.location.href = 'login.html';
    }
};
window.showLogin = showLogin;
window.showRegister = showRegister;
window.handlePasswordReset = handlePasswordReset;

document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();

    if (window.location.pathname.includes('order-history.html')) {
        if (!checkLoginStatus()) {
            window.location.href = 'login.html';
        } else {
            loadOrderHistory();
            loadUserProfile();
        }
    }

    const loginForm = document.getElementById('LoginForm');
    const regForm = document.getElementById('RegForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    if (regForm) {
        regForm.addEventListener('submit', handleRegister);
    }
});