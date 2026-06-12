import api from "../services/api.js";

const user = document.getElementById("user")

const token = localStorage.getItem('token')

if (!token) {
    window.location.href = '../login/login.html'
}