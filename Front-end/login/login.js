import api from "../services/api.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", loginUser);

async function loginUser(event) {

    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    try {

        const response = await api.post("/login", {
            email,
            password
        });

        console.log(response.data);

        alert("Login realizado!");

    } catch (error) {

        console.error(error);

        alert("Email ou senha inválidos");
    }
}