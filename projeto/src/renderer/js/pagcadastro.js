const cadastroForm = document.getElementById('cadastroForm');

if (cadastroForm) {
    cadastroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        const erroSenha = validarSenha(senha);
        if (erroSenha) {
            showMessage(erroSenha, 'error');
            return;
        }

        if (senha !== confirmarSenha) {
            showMessage('As senhas não coincidem!', 'error');
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (usuarios.find(u => u.email === email)) {
            showMessage('Email já cadastrado!', 'error');
            return;
        }

        usuarios.push({ nome, email, senha });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        showMessage('Cadastro realizado!', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 1500);
    });
}
