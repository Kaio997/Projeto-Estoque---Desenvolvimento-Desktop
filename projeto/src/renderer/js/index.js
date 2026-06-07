const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const erroSenha = validarSenha(senha);
        if (erroSenha) {
            showMessage(erroSenha, 'error');
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const user = usuarios.find(u => u.email === email && u.senha === senha);

        if (user) {
            localStorage.setItem('usuarioLogado', JSON.stringify(user));
            window.location.href = 'home.html';
        } else {
            showMessage('Credenciais inválidas!', 'error');
        }
    });
}
