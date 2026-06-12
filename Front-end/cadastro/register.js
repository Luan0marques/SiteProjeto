import api from "../services/api.js";
import { showToast } from '../utils/toast.js';

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const btn = document.getElementById("btn-action");
const logIn = document.getElementById("log-in");


logIn.addEventListener("click", acess);

function acess() {
    window.location.href = "../login/login.html";
}

btn.addEventListener("click", registerUser);

async function registerUser(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validação de campos vazios (opcional, mas melhora a UX)
    if (!name || !email || !password || !confirmPassword) {
        showToast("Por favor, preencha todos os campos.", "error");
        return;
    }

    if (password !== confirmPassword) {
        showToast("As senhas não coincidem!", "error");
        return;
    }

    const user = { name, email, password };

    console.log("Enviando:", user);

    try {
        const response = await api.post("/register", user);

        showToast("Cadastro realizado com sucesso! Redirecionando...", "success");

        // Aguarda 2 segundos para o usuário ver a mensagem de sucesso antes de redirecionar
        setTimeout(() => {
            window.location.href = "../login/login.html";
        }, 2000);

    } catch (error) {
        console.error(error);
        showToast("Erro ao cadastrar. Tente novamente.", "error");
    }
}