// Simulated user database
let users = JSON.parse(localStorage.getItem('users')) || [];

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    if (password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }
    if (users.some(user => user.username === username)) {
        alert('Username already exists!');
        return;
    }
    if (users.some(user => user.email === email)) {
        alert('Email already registered!');
        return;
    }

    users.push({
        username,
        email,
        password,
        createdAt: new Date().toISOString()
    });
    saveUsers();
    alert('Registration successful! Please sign in.');
    showLogin();
    document.getElementById('RegForm').reset();
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password!');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'account.html';
}

function checkLoginStatus() {
    return !!JSON.parse(localStorage.getItem('currentUser'));
}

function showRegister() {
    const regForm = document.getElementById('RegForm');
    const loginForm = document.getElementById('LoginForm');
    const indicator = document.getElementById('Indicator');
    if (regForm && loginForm && indicator) {
        regForm.style.transform = 'translateX(0px)';
        loginForm.style.transform = 'translateX(300px)';
        indicator.style.transform = 'translateX(100px)';
    }
}

function showLogin() {
    const regForm = document.getElementById('RegForm');
    const loginForm = document.getElementById('LoginForm');
    const indicator = document.getElementById('Indicator');
    if (regForm && loginForm && indicator) {
        regForm.style.transform = 'translateX(300px)';
        loginForm.style.transform = 'translateX(0px)';
        indicator.style.transform = 'translateX(0px)';
    }
}