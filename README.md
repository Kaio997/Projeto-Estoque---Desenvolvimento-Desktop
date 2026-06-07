# StockOS - Sistema de Gestão de Estoque Premium

StockOS é uma aplicação desktop moderna e intuitiva para gerenciamento de inventário, desenvolvida com foco em agilidade, precisão e uma experiência de usuário excepcional. Com uma interface inspirada em softwares de alta performance, o StockOS oferece controle total sobre entradas, saídas e patrimônio de estoque.

## 🚀 Funcionalidades

- **Dashboard Inteligente:** Visualização em tempo real do patrimônio total em estoque, número de SKUs e alertas críticos.
- **Gestão de Inventário Profissional:** Cadastro, edição e remoção de produtos com filtros de busca instantâneos.
- **Alertas de Reposição:** Sistema automático de identificação de itens com estoque baixo para evitar rupturas.
- **Segurança de Acesso:** Fluxo completo de Login e Cadastro de usuários com validações rigorosas de segurança.
- **Interface Premium:** Design dark mode moderno com foco em usabilidade e feedback visual imediato.

## 📁 Estrutura do Projeto

O projeto segue uma arquitetura modular e organizada:

```text
projeto/
└── src/
    └── renderer/
        ├── css/          # Estilos base e específicos por página
        ├── js/           # Lógica modular e funções compartilhadas
        └── views/        # Páginas HTML da aplicação
```

- `base.css` / `common.js`: Núcleo compartilhado de estilos e funções.
- Arquivos individuais por página (Ex: `index.css`, `index.js`): Mantêm o código limpo e de fácil manutenção.

## 🛠️ Tecnologias Utilizadas

- **Electron:** Framework para criação de aplicações desktop com tecnologias web.
- **JavaScript (ES6+):** Lógica da aplicação e manipulação dinâmica de dados.
- **CSS3:** Estilização avançada com variáveis, Grid Layout e Flexbox.
- **LocalStorage:** Persistência de dados local para usuários e inventário.

## ⚙️ Como Executar

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
2. Clone o repositório.
3. No terminal, na raiz do projeto, instale as dependências:
   ```bash
   npm install
   ```
4. Inicie a aplicação:
   ```bash
   npm start
   ```

## 📄 Licença

Este projeto está sob a licença ISC.
