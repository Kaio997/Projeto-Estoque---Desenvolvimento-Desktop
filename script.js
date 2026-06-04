// --- CONFIGURAÇÃO GLOBAL ---
const statusMsg = document.getElementById('statusMsg');

function showMessage(text, type) {
    if (!statusMsg) return;
    statusMsg.textContent = text;
    statusMsg.className = `status-msg ${type}`;
    setTimeout(() => { statusMsg.className = 'status-msg'; }, 4000);
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

if (estoqueForm) {
    estoqueForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const item = document.getElementById('item').value;
        const categoria = document.getElementById('categoria').value;
        const quantidade = document.getElementById('quantidade').value;
        const preco = document.getElementById('preco').value;

        const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
        estoque.push({ item, categoria, quantidade, preco });
        localStorage.setItem('estoque', JSON.stringify(estoque));

        showMessage('Item adicionado!', 'success');
        estoqueForm.reset();
        atualizarTabelaEstoque();
    });
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