import api from "../services/api.js";

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const btn = document.getElementById("btn-action");

btn.addEventListener("click", registerUser);

async function registerUser(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        alert("As senhas não coincidem");
        return;
    }

    const user = {
        name,
        email,
        password
    };

    console.log("Enviando:", user);

    try {
        const response = await api.post("/register", user);

        console.log(response.data);

        alert("Usuário cadastrado!");

        window.location.href = "../login/login.html"
    } catch (error) {
        console.error(error);

        alert("Erro ao cadastrar");
    }
}