// user-management.js

// Simulated user database using localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;

    // Check if username or email already exists
    if (users.some(user => user.username === username)) {
        alert('Username already exists!');
        return;
    }
    if (users.some(user => user.email === email)) {
        alert('Email already registered!');
        return;
    }

    // Add new user
    const newUser = {
        username,
        email,
        password, // In a real app, this should be hashed
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
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
        window.location.href = 'index.html'; // Redirect to home page
    } else {
        alert('Invalid username or password!');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'account.html';
}

// Check if user is logged in
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return !!currentUser;
}

// In user-management.js, within handleRegister
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    alert('Please enter a valid email address!');
    return;
}
if (password.length < 6) {
    alert('Password must be at least 6 characters long!');
    return;
}

