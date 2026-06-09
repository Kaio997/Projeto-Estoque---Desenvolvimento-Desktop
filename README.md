<p align="center">
  <img src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/128/000000/external-box-delivery-flatart-icons-flat-flatarticons.png" width="100" alt="StockOS Logo" />
</p>

<h1 align="center">StockOS - Enterprise Inventory System</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" />
  <img src="https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white" />
</p>

<p align="center">
  <b>A robust, full-stack inventory management solution built with Clean Architecture, DDD, and professional security standards.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/marceloferreiracampos07/Projeto-Estoque---Desenvolvimento-Desktop?style=flat-square" />
  <img src="https://img.shields.io/badge/Architecture-Clean_Arch-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Security-JWT_%26_Argon2-green?style=flat-square" />
</p>

---

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Summary](#-project-summary-latest-updates)

---

## 🌟 About the Project
StockOS is an enterprise-grade solution for inventory control. It bridges the gap between complex industrial requirements and a seamless user experience, ensuring that inventory tracking, user management, and financial reporting are handled with precision and security.

---

## ✨ Key Features

- 🔐 **Secure Authentication:** Identity management using **Argon2** hashing and **JWT** stateless sessions.
- 📊 **Dynamic Dashboard:** Real-time calculation of total assets, SKU count, and critical stock alerts.
- 📦 **Inventory Lifecycle:** Complete CRUD operations for products with category-based filtering.
- 🚀 **Performance Optimized:** Asynchronous communication and optimized SQL queries via Sequelize.
- 🎨 **Premium UI/UX:** A modern, dark-themed interface built for speed and visual clarity.

---

## 🏗️ System Architecture

### 💎 Clean Architecture
The backend is structured to decouple business rules from external technologies.
- **Entities & Use Cases:** Core logic remains pure and independent.
- **Infrastructure Layer:** Handles database persistence (Sequelize), HTTP (Express), and configurations.

### 🧩 Domain-Driven Design (DDD)
- **Repository Pattern:** Abstracted data access layers for scalability and testability.
- **DTOs:** Strict data transfer objects using **Zod** for schema validation.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Backend** | Node.js, Express |
| **Desktop** | Electron |
| **Database** | MySQL, Sequelize ORM |
| **Security** | Argon2, JWT, Zod |
| **Frontend** | Vanilla JS (ES6+), CSS3 Modern |

---

## 🚦 Getting Started

### Pré-requisitos
- Node.js 18+
- MySQL Database
- Docker Desktop (para a infraestrutura do backend)

### Fluxo de Início Rápido

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/marceloferreiracampos07/Projeto-Estoque---Desenvolvimento-Desktop.git
   cd Projeto-Estoque---Desenvolvimento-Desktop
   ```

2. **Instale as dependências:**
   ```bash
   # Na raiz do projeto
   npm install
   # Na pasta do backend
   cd projeto/src/backend
   npm install
   cd ../../..
   ```

3. **Inicie a Infraestrutura do Backend (Docker):**
   ```bash
   cd projeto/src/backend
   docker-compose up -d
   cd ../../..
   ```

4. **Inicie a Aplicação Desktop (Electron):**
   ```bash
   npm start
   ```

---

## 📋 Project Summary (Latest Updates)
<details>
<summary>Click to view latest development report</summary>

### 📊 Relatório de Atividades - StockOS

#### 1. Segurança & Infraestrutura
- Implementação de Docker para banco de dados e API.
- Configuração de variáveis de ambiente.

#### 2. Desktop Integration
- Integração total com Electron para execução como app desktop.
- Correção de navegação e ajustes de UI (janela responsiva).

#### 3. UX & Fixes (Finalizado)
- Ajustes finos na interface (Botões e menus).
- Correção de navegação no ambiente Electron.

#### 🚀 Status Final
| Módulo | Qualidade | Status |
| :--- | :--- | :--- |
| **Desktop App** | Electron Integrated | 🟢 Production Ready |
| **Backend API** | Dockerized | 🟢 Production Ready |
</details>

---
<p align="center">
  Made with ❤️ for the Developer Community.
</p>
