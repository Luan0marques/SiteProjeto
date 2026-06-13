import api from '../services/api.js';
import { showToast, showConfirmToast } from '../utils/toast.js';

const userElements = document.querySelectorAll('.user');

async function loadUser() {

    const token = localStorage.getItem('token');

    if (!token) {

        window.location.href =
            '../login/login.html';

        return;
    }

    try {

        const response = await api.get(
            '/me',
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        userElements.forEach(element => {
            element.textContent =
                response.data.name;
        });

    } catch (error) {

        console.error(error);

        localStorage.removeItem('token');

        window.location.href =
            '../login/login.html';
    }
}
const logoutBtn =
    document.getElementById('logout-btn');

logoutBtn.addEventListener(
    'click',
    logout
);

function logout() {

    showConfirmToast(
        'Deseja realmente encerrar sua sessão?',
        () => {

            localStorage.removeItem(
                'token'
            );

            showToast(
                'Sessão encerrada com sucesso!',
                'success'
            );

            setTimeout(() => {

                window.location.href =
                    '../login/login.html';

            }, 1000);
        }
    );
}

loadUser();