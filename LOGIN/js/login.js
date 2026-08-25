document.addEventListener("DOMContentLoaded", () => {
    const passwordInput =
        document.getElementById("password");
    const loginForm =
        document.getElementById("loginForm");

    /*
    form submit
    */

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username =
            document.getElementById("username").value.trim();
        const password =
            passwordInput.value;
        if (!username || !password) {
            return;
        }
        const button =
            loginForm.querySelector(".login-button");
        const originalText =
            button.innerHTML;
        button.innerHTML =
            `
            <span>در حال ورود...</span>
            <i class="bi bi-arrow-repeat spin"></i>
            `;
        button.disabled = true;
        setTimeout(() => {
            button.innerHTML =
                originalText;
            button.disabled = false;
        }, 1500);
    });
});