if (apiClient.getToken() && localStorage.getItem('usuarioLogado')) {
    window.location.href = 'home.html';
}

const cadastroForm = document.getElementById('cadastroForm');

if (cadastroForm) {
    cadastroForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        const passwordError = validatePassword(password);
        if (passwordError) {
            showMessage(passwordError, 'error');
            return;
        }

        if (password !== confirmarSenha) {
            showMessage('As senhas não coincidem!', 'error');
            return;
        }

        try {
            await apiClient.request('/users/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password })
            });

            showMessage('Cadastro realizado!', 'success');
            setTimeout(() => { window.location.href = 'index.html'; }, 1500);
        } catch (error) {
            showMessage(error.message, 'error');
        }
    });
}
