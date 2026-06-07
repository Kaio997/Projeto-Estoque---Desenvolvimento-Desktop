// Auth Check
const user = JSON.parse(localStorage.getItem('usuarioLogado'));
if (user) {
    document.getElementById('userNameDisplay').textContent = user.nome;
    document.getElementById('userNameHeader').textContent = user.nome;
} else {
    window.location.href = 'index.html';
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'index.html';
    });
}

// Dashboard Statistics
function atualizarDashboard() {
    const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
    const threshold = 5;

    // 1. Total de Itens
    const totalItensEl = document.getElementById('totalItens');
    if (totalItensEl) totalItensEl.textContent = estoque.length;

    // 2. Patrimônio Total
    const valorTotalEstoqueEl = document.getElementById('valorTotalEstoque');
    const valorTotal = estoque.reduce((acc, curr) => acc + (parseFloat(curr.preco) * parseInt(curr.quantidade)), 0);
    if (valorTotalEstoqueEl) {
        valorTotalEstoqueEl.textContent = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // 3. Itens em Alerta
    const itensBaixoEstoqueEl = document.getElementById('itensBaixoEstoque');
    const itensEmAlerta = estoque.filter(item => parseInt(item.quantidade) < threshold);
    if (itensBaixoEstoqueEl) itensBaixoEstoqueEl.textContent = itensEmAlerta.length;

    // 4. Renderizar Lista de Alertas na Home
    const listaAlertasHome = document.getElementById('listaAlertasHome');
    if (listaAlertasHome) {
        if (itensEmAlerta.length === 0) {
            listaAlertasHome.innerHTML = '<p style="color: var(--text-muted); font-size: 14px;">Tudo sob controle! Nenhum item com estoque baixo.</p>';
        } else {
            listaAlertasHome.innerHTML = '';
            // Mostrar apenas os top 4 alertas
            itensEmAlerta.slice(0, 4).forEach(item => {
                const div = document.createElement('div');
                div.className = 'alert-item';
                div.innerHTML = `
                    <div class="alert-item-info">
                        <h4>${item.item}</h4>
                        <p>${item.categoria}</p>
                    </div>
                    <div class="alert-badge">${item.quantidade} un</div>
                `;
                listaAlertasHome.appendChild(div);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', atualizarDashboard);
