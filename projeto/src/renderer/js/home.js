const user = JSON.parse(localStorage.getItem('usuarioLogado'));
const token = apiClient.getToken();

if (user && token) {
    document.getElementById('userNameDisplay').textContent = user.name;
    document.getElementById('userNameHeader').textContent = user.name;
} else {
    window.location.href = 'index.html';
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        apiClient.clearToken();
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'index.html';
    });
}

async function updateDashboard() {
    try {
        const estoque = await apiClient.request('/products');
        const threshold = 5;

        const totalItensEl = document.getElementById('totalItens');
        if (totalItensEl) totalItensEl.textContent = estoque.length;

        const valorTotalEstoqueEl = document.getElementById('valorTotalEstoque');
        const valorTotal = estoque.reduce((acc, curr) => acc + (parseFloat(curr.price) * parseInt(curr.quantity)), 0);
        if (valorTotalEstoqueEl) {
            valorTotalEstoqueEl.textContent = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }

        const itensBaixoEstoqueEl = document.getElementById('itensBaixoEstoque');
        const itensEmAlerta = estoque.filter(item => parseInt(item.quantity) < threshold);
        if (itensBaixoEstoqueEl) itensBaixoEstoqueEl.textContent = itensEmAlerta.length;

        const listaAlertasHome = document.getElementById('listaAlertasHome');
        if (listaAlertasHome) {
            if (itensEmAlerta.length === 0) {
                listaAlertasHome.innerHTML = '<p style="color: var(--text-muted); font-size: 14px;">Tudo sob controle! Nenhum item com estoque baixo.</p>';
            } else {
                listaAlertasHome.innerHTML = '';
                itensEmAlerta.slice(0, 4).forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'alert-item';
                    div.innerHTML = `
                        <div class="alert-item-info">
                            <h4>${item.name}</h4>
                            <p>${item.category}</p>
                        </div>
                        <div class="alert-badge">${item.quantity} un</div>
                    `;
                    listaAlertasHome.appendChild(div);
                });
            }
        }
    } catch (error) {
        console.error('Erro ao atualizar dashboard:', error);
    }
}

document.addEventListener('DOMContentLoaded', updateDashboard);
window.addEventListener('focus', updateDashboard);
