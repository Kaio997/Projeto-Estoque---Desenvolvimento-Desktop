if (apiClient.getToken() && localStorage.getItem('usuarioLogado')) {
    window.location.href = 'home.html';
}

const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('senha').value;

        try {
            const data = await apiClient.request('/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            apiClient.setToken(data.token);
            localStorage.setItem('usuarioLogado', JSON.stringify(data.user));
            window.location.href = 'home.html';
        } catch (error) {
            showMessage(error.message, 'error');
        }
    });
}
