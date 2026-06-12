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