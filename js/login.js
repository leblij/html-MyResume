function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        localStorage.setItem('fm_user', JSON.stringify({username, password, trialStart: Date.now()}));
        alert('Account aangemaakt. Log nu in.');
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const stored = JSON.parse(localStorage.getItem('fm_user'));
    if (stored && stored.username === username && stored.password === password) {
        sessionStorage.setItem('fm_logged_in', 'true');
        window.location.href = 'training.html';
    } else {
        alert('Ongeldige login');
    }
}
