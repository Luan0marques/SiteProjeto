import api from '../services/api.js';
import { showToast } from '../utils/toast.js';

const verifyBtn = document.getElementById("verify-btn")
const inputs = document.querySelectorAll('.code-input');
const resendCodeBtn = document.getElementById('resend-code');

resendCodeBtn.style.pointerEvents = 'none';

resendCodeBtn.addEventListener('click',resendCode);

resendCodeBtn.style.pointerEvents = 'none';
resendCodeBtn.textContent = 'Aguarde 60s';

setTimeout(() => {

    resendCodeBtn.style.pointerEvents =
        'auto';

    resendCodeBtn.textContent =
        'Reenviar código';

}, 60000);

async function resendCode(event) {

    event.preventDefault();

    const email =
        localStorage.getItem(
            'recoveryEmail'
        );

    try {

        await api.post(
            '/recover-password',
            { email }
        );

        showToast(
            'Novo código enviado!',
            'success'
        );

    } catch (error) {

        console.error(error);

        showToast(
            'Erro ao reenviar código.',
            'error'
        );
    }
}

inputs[0].focus();

inputs.forEach((input, index) => {

    input.addEventListener('input', (event) => {

        // Permite apenas números
        event.target.value = event.target.value.replace(/\D/g, '');

        // Vai para o próximo campo
        if (
            event.target.value.length === 1 &&
            index < inputs.length - 1
        ) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (event) => {

        // Volta para o campo anterior ao apagar
        if (
            event.key === 'Backspace' &&
            input.value === '' &&
            index > 0
        ) {
            inputs[index - 1].focus();
        }
    });

});

inputs[0].addEventListener('paste', (event) => {

    event.preventDefault();

    const pastedData =
        event.clipboardData
            .getData('text')
            .trim();

    if (/^\d{6}$/.test(pastedData)) {

        pastedData
            .split('')
            .forEach((digit, index) => {

                if (inputs[index]) {
                    inputs[index].value = digit;
                }
            });

        inputs[inputs.length - 1].focus();
    }
});

verifyBtn.addEventListener("click", verifyCode)

async function verifyCode(event) {

    event.preventDefault();

    let code = '';

    inputs.forEach(input => {
        code += input.value;
    });

    const email =
        localStorage.getItem(
            'recoveryEmail'
        );

    try {

        const email = localStorage.getItem('recoveryEmail');

        console.log('Email:', email);
        console.log('Código:', code);

        await api.post(
            '/verify-code',
            {
                email,
                code
            }
        );

        localStorage.setItem(
            'verifiedRecovery',
            'true'
        );

        window.location.href =
            './resetPassword.html';

    } catch (error) {

        console.error(error);

        alert(
            'Código inválido ou expirado'
        );
    }
}