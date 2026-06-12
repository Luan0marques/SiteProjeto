import api from '../services/api.js';
import { showToast } from '../utils/toast.js';

const saveNewPass = document.getElementById("reset-btn");
const newPasswordInput = document.getElementById("newPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");

saveNewPass.addEventListener("click", resetPassword);

async function resetPassword(event) {

    event.preventDefault();

    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (newPassword !== confirmPassword) {

        showToast(
            'As senhas não coincidem',
            'error'
        );

        return;
    }

    const email = localStorage.getItem(
        'recoveryEmail'
    );

    try {

        const response = await api.post(
            '/reset-password',
            {
                email,
                newPassword
            }
        );

        console.log(response.data);

        localStorage.removeItem(
            'verifiedRecovery'
        );

        localStorage.removeItem(
            'recoveryEmail'
        );

        showToast(
            'Senha alterada com sucesso!',
            'success'
        );

        setTimeout(() => {

            window.location.href =
                '../login/login.html';

        }, 1500);

    } catch(error) {

        console.error(error);

        showToast(
            'Erro ao alterar senha',
            'error'
        );
    }
}