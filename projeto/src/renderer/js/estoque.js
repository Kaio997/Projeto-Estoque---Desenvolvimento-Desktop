const welcomeMsg = document.getElementById('userNameDisplay');
const logoutBtn = document.getElementById('logoutBtn');

// Auth Check
const user = JSON.parse(localStorage.getItem('usuarioLogado'));
if (user) {
    if (welcomeMsg) welcomeMsg.textContent = user.nome;
} else {
    window.location.href = 'index.html';
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'index.html';
    });
}

// Inventory Logic
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
            estoque.push({ item, categoria, quantidade, preco });
            showMessage('Item adicionado!', 'success');
        } else {
            estoque[index] = { item, categoria, quantidade, preco };
            showMessage('Item atualizado!', 'success');
            resetForm();
        }

        localStorage.setItem('estoque', JSON.stringify(estoque));
        estoqueForm.reset();
        atualizarPagina();
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
    if (submitBtn) submitBtn.textContent = "Adicionar Item";
    if (cancelBtn) cancelBtn.style.display = "none";
}

function atualizarPagina() {
    const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
    renderizarItens(estoque);
    atualizarSumario(estoque);
}

function atualizarSumario(estoque) {
    const totalItensEl = document.getElementById('totalItens');
    const itensBaixoEl = document.getElementById('itensBaixoEstoque');
    const threshold = 5;
    const totalBaixo = estoque.filter(item => parseInt(item.quantidade) < threshold).length;

    if (totalItensEl) totalItensEl.textContent = estoque.length;
    if (itensBaixoEl) itensBaixoEl.textContent = totalBaixo;
}

function renderizarItens(itens) {
    if (!listaEstoque) return;
    listaEstoque.innerHTML = '';
    const threshold = 5;

    itens.forEach((item, index) => {
        const isBaixo = parseInt(item.quantidade) < threshold;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div style="font-weight: 700;">${item.item}</div>
                ${isBaixo ? '<span class="badge-warning">REPOR ESTOQUE</span>' : ''}
            </td>
            <td><span style="opacity: 0.7; font-size: 12px;">${item.categoria}</span></td>
            <td class="${isBaixo ? 'low-stock' : ''}">${item.quantidade} un</td>
            <td>R$ ${parseFloat(item.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            <td class="text-right">
                <div class="action-btns">
                    <button class="btn-icon edit" onclick="editarItemEstoque(${index})" title="Editar">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button class="btn-icon delete" onclick="removerItemEstoque(${index})" title="Remover">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </div>
            </td>
        `;
        listaEstoque.appendChild(row);
    });
}

window.editarItemEstoque = function(index) {
    const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
    const item = estoque[index];
    document.getElementById('item').value = item.item;
    document.getElementById('categoria').value = item.categoria;
    document.getElementById('quantidade').value = item.quantidade;
    document.getElementById('preco').value = item.preco;
    if (editIndexInput) editIndexInput.value = index;
    if (submitBtn) submitBtn.textContent = "Salvar Alterações";
    if (cancelBtn) cancelBtn.style.display = "inline-flex";
    document.querySelector('.main-content').scrollTo({ top: 0, behavior: 'smooth' });
}

window.removerItemEstoque = function(index) {
    if (confirm('Tem certeza que deseja remover este item?')) {
        const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
        estoque.splice(index, 1);
        localStorage.setItem('estoque', JSON.stringify(estoque));
        atualizarPagina();
        showMessage('Item removido!', 'error');
    }
}

window.filtrarEstoque = function() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
    const filtrados = estoque.filter(i => 
        i.item.toLowerCase().includes(termo) || 
        i.categoria.toLowerCase().includes(termo)
    );
    renderizarItens(filtrados);
}

document.addEventListener('DOMContentLoaded', atualizarPagina);
