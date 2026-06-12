import api from '../services/api.js';
import { showToast } from '../utils/toast.js';

const emailInput = document.getElementById('email');
const btn = document.getElementById('send-code-btn');
const spinner = document.getElementById("spinner");
const btnText = document.getElementById("btn-text");

btn.addEventListener('click', sendCode);

async function sendCode(event) {

    event.preventDefault();

    const email = emailInput.value.trim();

    try {

        spinner.classList.remove("hidden");
        btnText.textContent = "Enviando...";
        btn.disabled = true;

        await api.post(
            '/recover-password',
            { email }
        );

        localStorage.setItem(
            'recoveryEmail',
            email
        );

        showToast(
            'Código enviado para seu email!',
            'success'
        );

        setTimeout(() => {
            window.location.href =
                './verifyCode.html';
        }, 1500);

    } catch (error) {

        showToast(
            'Email não encontrado',
            'error'
        );

    } finally {

        spinner.classList.add("hidden");
        btnText.textContent = "Enviar Código";
        btn.disabled = false;
    }
}