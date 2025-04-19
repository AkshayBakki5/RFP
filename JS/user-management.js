function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
        alert('Username already exists.');
        return;
    }
    if (users.some(user => user.email === email)) {
        alert('Email already registered.');
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Please sign in.');
    showLogin();
    document.getElementById('RegForm').reset();
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login successful!');
        document.getElementById('logout-link').style.display = 'block';
        document.getElementById('LoginForm').reset();
    } else {
        alert('Invalid username or password.');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    document.getElementById('logout-link').style.display = 'none';
    showLogin();
    window.location.href = 'account.html';
}

function checkLoginStatus() {
    return !!localStorage.getItem('currentUser');
}

function showLogin() {
    document.getElementById('LoginForm').style.display = 'block';
    document.getElementById('RegForm').style.display = 'none';
    document.getElementById('Indicator').style.transform = 'translateX(0)';
}

function showRegister() {
    document.getElementById('LoginForm').style.display = 'none';
    document.getElementById('RegForm').style.display = 'block';
    document.getElementById('Indicator').style.transform = 'translateX(100px)';
}