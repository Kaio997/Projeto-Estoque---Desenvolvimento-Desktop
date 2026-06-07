const welcomeMsg = document.getElementById('userNameDisplay');
const logoutBtn = document.getElementById('logoutBtn');

// Auth Check (Refactor later to use token validation)
const token = apiClient.getToken();
if (!token) {
    window.location.href = 'index.html';
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        apiClient.clearToken();
        window.location.href = 'index.html';
    });
}

// Inventory Logic
const estoqueForm = document.getElementById('estoqueForm');
const listaEstoque = document.getElementById('listaEstoque');
const editIdInput = document.getElementById('editId');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

if (estoqueForm) {
    estoqueForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('item').value;
        const category = document.getElementById('categoria').value;
        const quantity = parseInt(document.getElementById('quantidade').value);
        const price = parseFloat(document.getElementById('preco').value);
        const id = editIdInput ? editIdInput.value : null;

        try {
            if (!id || id === "-1") {
                await apiClient.request('/products', {
                    method: 'POST',
                    body: JSON.stringify({ name, category, quantity, price })
                });
                showMessage('Item adicionado!', 'success');
            } else {
                await apiClient.request(`/products/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ name, category, quantity, price })
                });
                showMessage('Item atualizado!', 'success');
                resetForm();
            }

            estoqueForm.reset();
            atualizarPagina();
        } catch (error) {
            showMessage(error.message, 'error');
        }
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        resetForm();
        estoqueForm.reset();
    });
}

function resetForm() {
    if (editIdInput) editIdInput.value = "-1";
    if (submitBtn) submitBtn.textContent = "Adicionar Item";
    if (cancelBtn) cancelBtn.style.display = "none";
}

async function atualizarPagina() {
    try {
        const estoque = await apiClient.request('/products');
        renderizarItens(estoque);
        atualizarSumario(estoque);
    } catch (error) {
        showMessage('Erro ao carregar estoque', 'error');
    }
}

function atualizarSumario(estoque) {
    const totalItensEl = document.getElementById('totalItens');
    const itensBaixoEl = document.getElementById('itensBaixoEstoque');
    const threshold = 5;
    const totalBaixo = estoque.filter(item => parseInt(item.quantity) < threshold).length;

    if (totalItensEl) totalItensEl.textContent = estoque.length;
    if (itensBaixoEl) itensBaixoEl.textContent = totalBaixo;
}

function renderizarItens(itens) {
    if (!listaEstoque) return;
    listaEstoque.innerHTML = '';
    const threshold = 5;

    itens.forEach((item) => {
        const isBaixo = parseInt(item.quantity) < threshold;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div style="font-weight: 700;">${item.name}</div>
                ${isBaixo ? '<span class="badge-warning">REPOR ESTOQUE</span>' : ''}
            </td>
            <td><span style="opacity: 0.7; font-size: 12px;">${item.category}</span></td>
            <td class="${isBaixo ? 'low-stock' : ''}">${item.quantity} un</td>
            <td>R$ ${parseFloat(item.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            <td class="text-right">
                <div class="action-btns">
                    <button class="btn-icon edit" onclick="editarItemEstoque('${item.id}')" title="Editar">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button class="btn-icon delete" onclick="removerItemEstoque('${item.id}')" title="Remover">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </div>
            </td>
        `;
        listaEstoque.appendChild(row);
    });
}

window.editarItemEstoque = async function(id) {
    try {
        const produtos = await apiClient.request('/products');
        const item = produtos.find(p => p.id === id);
        if (!item) return;

        document.getElementById('item').value = item.name;
        document.getElementById('categoria').value = item.category;
        document.getElementById('quantidade').value = item.quantity;
        document.getElementById('preco').value = item.price;
        if (editIdInput) editIdInput.value = item.id;
        if (submitBtn) submitBtn.textContent = "Salvar Alterações";
        if (cancelBtn) cancelBtn.style.display = "inline-flex";
        document.querySelector('.main-content').scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        showMessage('Erro ao buscar item', 'error');
    }
}

window.removerItemEstoque = async function(id) {
    if (confirm('Tem certeza que deseja remover este item?')) {
        try {
            await apiClient.request(`/products/${id}`, { method: 'DELETE' });
            atualizarPagina();
            showMessage('Item removido!', 'error');
        } catch (error) {
            showMessage(error.message, 'error');
        }
    }
}

document.addEventListener('DOMContentLoaded', atualizarPagina);
