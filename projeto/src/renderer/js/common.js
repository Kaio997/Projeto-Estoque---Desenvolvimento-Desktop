function showMessage(text, type) {
    const statusMsg = document.getElementById('statusMsg');
    if (!statusMsg) return;
    
    statusMsg.textContent = text;
    statusMsg.className = `status-msg ${type}`;
    
    setTimeout(() => { 
        statusMsg.className = 'status-msg'; 
    }, 4000);
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return "A senha deve ter pelo menos 8 caracteres.";
    }
    if (!hasUpperCase) {
        return "A senha deve conter pelo menos uma letra maiúscula.";
    }
    if (!hasLowerCase) {
        return "A senha deve conter pelo menos uma letra minúscula.";
    }
    if (!hasSpecialChar) {
        return "A senha deve conter pelo menos um caractere especial.";
    }
    
    return null;
}
