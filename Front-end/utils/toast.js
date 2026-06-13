export function showToast(message, type = "success") {

    let container =
        document.getElementById("toast-container");

    if (!container) {

        container =
            document.createElement("div");

        container.id = "toast-container";

        document.body.appendChild(
            container
        );
    }

    const toast =
        document.createElement("div");

    toast.classList.add(
        "toast",
        type
    );

    const icon =
        type === "success"
            ? '<i class="fa-solid fa-circle-check"></i>'
            : '<i class="fa-solid fa-circle-exclamation"></i>';

    toast.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("hide");

        toast.addEventListener(
            "animationend",
            () => toast.remove()
        );

    }, 4000);
}

export function showConfirmToast(message, onConfirm) {

    let container =
        document.getElementById("toast-container");

    if (!container) {

        container = document.createElement("div");

        container.id = "toast-container";

        document.body.appendChild(container);
    }

    const toast = document.createElement("div");

    toast.classList.add(
        "toast",
        "confirm-toast"
    );

    toast.innerHTML = `
        <div>
            <i class="fa-solid fa-right-from-bracket"></i>
            <span>${message}</span>
        </div>

        <div class="toast-actions">
            <button class="cancel-btn">
                Cancelar
            </button>

            <button class="confirm-btn">
                Sair
            </button>
        </div>
    `;

    container.appendChild(toast);

    toast
        .querySelector(".cancel-btn")
        .addEventListener("click", () => {
            toast.remove();
        });

    toast
        .querySelector(".confirm-btn")
        .addEventListener("click", () => {

            toast.remove();

            if (onConfirm) {
                onConfirm();
            }
        });
}