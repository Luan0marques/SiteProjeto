import api from "../services/api.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const register = document.getElementById("register");

register.addEventListener("click", registerUser)

function registerUser() {
    window.location.href = '../cadastro/register.html'
}

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

        localStorage.setItem(
            'token',
             response.data.token
        )

        window.location.href = '../telaInicial/homepage.html'

        console.log(response.data);


    } catch (error) {

        console.error(error);

        alert("Email ou senha inválidos");
    }
}