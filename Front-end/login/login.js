import api from "../services/api.js";
import { showToast } from '../utils/toast.js';

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const register = document.getElementById("register");
const forgetPass = document.getElementById("forgetPassword");

// Voltar para a tela de login

forgetPass.addEventListener("click", forgotPass);

function forgotPass(event) {
    event.preventDefault(); // Evita comportamento padrão de links vazios
    window.location.href = '../recoverPassword/recoverPassword.html';
}

register.addEventListener("click", registerUser);

function registerUser(event) {
    event.preventDefault(); // Evita comportamento padrão de links vazios
    window.location.href = '../cadastro/register.html';
}

loginBtn.addEventListener("click", loginUser);

async function loginUser(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validação básica para evitar requisições desnecessárias
    if (!email || !password) {
        showToast("Por favor, preencha todos os campos.", "error");
        return;
    }

    try {
        const response = await api.post("/login", { email, password });

        localStorage.setItem('token', response.data.token);

        showToast("Login realizado com sucesso! Entrando...", "success");

        // Pequeno delay elegante para dar tempo de ver a animação de sucesso
        setTimeout(() => {
            window.location.href = '../telaInicial/homepage.html';
        }, 1500);

        console.log(response.data);

    } catch (error) {

    console.error(error);

    if (error.response?.status === 404) {

        showToast(
            "Este email não está cadastrado. Crie uma conta primeiro. Voce sera Redirecionado",
            "error"
        );

        setTimeout(() => {
            window.location.href = "../cadastro/register.html";
        }, 4000);

        return;
    }

    if (error.response?.status === 401) {

        showToast(
            "Senha incorreta.",
            "error"
        );

        return;
    }

    showToast(
        "Erro ao conectar com o servidor.",
        "error"
    );
}
}