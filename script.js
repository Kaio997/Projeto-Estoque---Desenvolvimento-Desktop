// --- CONFIGURAÇÃO GLOBAL ---
const statusMsg = document.getElementById('statusMsg');

function showMessage(text, type) {
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

// --- SISTEMA DE LOGIN E CADASTRO ---
const loginForm = document.getElementById('loginForm');
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

// --- SISTEMA DE ESTOQUE ---
const estoqueForm = document.getElementById('estoqueForm');
const listaEstoque = document.getElementById('listaEstoque');
const editIndexInput = document.getElementById('editIndex');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

if (estoqueForm) {
    estoqueForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const item = document.getElementById('item').value;
        const categoria = document.getElementById('categoria').value;
        const quantidade = document.getElementById('quantidade').value;
        const preco = document.getElementById('preco').value;
        const index = parseInt(editIndexInput.value);

        const estoque = JSON.parse(localStorage.getItem('estoque')) || [];

        if (index === -1) {
            // Adicionar novo
            estoque.push({ item, categoria, quantidade, preco });
            showMessage('Item adicionado!', 'success');
        } else {
            // Atualizar existente
            estoque[index] = { item, categoria, quantidade, preco };
            showMessage('Item atualizado!', 'success');
            resetForm();
        }

        localStorage.setItem('estoque', JSON.stringify(estoque));
        estoqueForm.reset();
        atualizarTabelaEstoque();
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        resetForm();
        estoqueForm.reset();
    });
}

function resetForm() {
    if (editIndexInput) editIndexInput.value = "-1";
    if (submitBtn) submitBtn.textContent = "Cadastrar";
    if (cancelBtn) cancelBtn.style.display = "none";
}

function atualizarTabelaEstoque() {
    if (!listaEstoque) return;
    const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
    renderizarItens(estoque);
}

function renderizarItens(itens) {
    if (!listaEstoque) return;
    listaEstoque.innerHTML = '';
    
    let totalBaixo = 0;
    const threshold = 5; // Limite para estoque baixo

    itens.forEach((item, index) => {
        const isBaixo = parseInt(item.quantidade) < threshold;
        if (isBaixo) totalBaixo++;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.item} ${isBaixo ? '<span class="badge-warning">Repor</span>' : ''}</td>
            <td>${item.categoria}</td>
            <td class="${isBaixo ? 'low-stock' : ''}">${item.quantidade}</td>
            <td>R$ ${parseFloat(item.preco).toFixed(2)}</td>
            <td>
                <button class="btn-small btn-edit" onclick="editarItemEstoque(${index})">Atualizar</button>
                <button class="btn-small btn-danger" onclick="removerItemEstoque(${index})">Remover</button>
            </td>
        `;
        listaEstoque.appendChild(row);
    });

    // Atualizar Contadores
    const totalItensEl = document.getElementById('totalItens');
    const itensBaixoEl = document.getElementById('itensBaixoEstoque');
    
    if (totalItensEl) totalItensEl.textContent = itens.length;
    if (itensBaixoEl) itensBaixoEl.textContent = totalBaixo;
}

function editarItemEstoque(index) {
    const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
    const item = estoque[index];

    // Preencher o formulário
    document.getElementById('item').value = item.item;
    document.getElementById('categoria').value = item.categoria;
    document.getElementById('quantidade').value = item.quantidade;
    document.getElementById('preco').value = item.preco;
    
    // Configurar modo de edição
    if (editIndexInput) editIndexInput.value = index;
    if (submitBtn) submitBtn.textContent = "Salvar Alterações";
    if (cancelBtn) cancelBtn.style.display = "block";
    
    // Rolar para o formulário
    estoqueForm.scrollIntoView({ behavior: 'smooth' });
}

function removerItemEstoque(index) {
    const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
    estoque.splice(index, 1);
    localStorage.setItem('estoque', JSON.stringify(estoque));
    atualizarTabelaEstoque();
}

function filtrarEstoque() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
    const filtrados = estoque.filter(i => 
        i.item.toLowerCase().includes(termo) || 
        i.categoria.toLowerCase().includes(termo)
    );
    renderizarItens(filtrados);
}
