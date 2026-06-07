/** Common utilities and shared functions **/

function showMessage(text, type) {
    const statusMsg = document.getElementById('statusMsg');
    if (!statusMsg) return;
    statusMsg.textContent = text;
    statusMsg.className = `status-msg ${type}`;
    setTimeout(() => { statusMsg.className = 'status-msg'; }, 4000);
}

function validarSenha(senha) {
    const minComprimento = 8;
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    if (senha.length < minComprimento) return "A senha deve ter pelo menos 8 caracteres.";
    if (!temMaiuscula) return "A senha deve conter pelo menos uma letra maiúscula.";
    if (!temMinuscula) return "A senha deve conter pelo menos uma letra minúscula.";
    if (!temEspecial) return "A senha deve conter pelo menos um caractere especial.";
    
    return null; // Senha válida
}
