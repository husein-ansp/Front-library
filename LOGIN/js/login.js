document.addEventListener("DOMContentLoaded", () => {
    const passwordInput =
        document.getElementById("password");
    const togglePassword =
        document.getElementById("togglePassword");
    const strengthContainer =
        document.getElementById("passwordStrength");
    const strengthBar =
        document.getElementById("strengthBar");
    const strengthText =
        document.getElementById("strengthText");
    const passwordCounter =
        document.getElementById("passwordCounter");
    const loginForm =
        document.getElementById("loginForm");

    /*
    hide password
    */

    togglePassword.addEventListener("click", () => {
        const isPassword =
            passwordInput.type === "password";
        if (isPassword) {
            passwordInput.type = "text";
            togglePassword.innerHTML =
                '<i class="bi bi-eye-slash"></i>';
            togglePassword.setAttribute(
                "aria-label",
                "مخفی کردن رمز عبور"
            );
        } else {
            passwordInput.type = "password";
            togglePassword.innerHTML =
                '<i class="bi bi-eye"></i>';
            togglePassword.setAttribute(
                "aria-label",
                "نمایش رمز عبور"
            );
        }
    });

    /* 
    password strength
    */

    passwordInput.addEventListener("input", () => {
        let password =
            passwordInput.value;
        if (password.length > 16) {
            password =
                password.substring(0, 16);
            passwordInput.value =
                password;
        }
        const length =
            password.length;

        /*
        counter 
        */

        passwordCounter.textContent =
            `${length} / 16`;
        if (length > 0) {
            strengthContainer.classList.add(
                "visible"
            );
        } else {
            strengthContainer.classList.remove(
                "visible"
            );
            strengthBar.style.width = "0%";
            strengthText.textContent =
                "قدرت رمز عبور";
            return;
        }
        const steps =
            Math.ceil(length / 2);
        const percentage =
            Math.min(steps * 12.5, 100);
        strengthBar.style.width =
            `${percentage}%`;

        /* 
        strength text
        */

        if (length <= 2) {
            strengthText.textContent =
                "خیلی ضعیف";
        } else if (length <= 4) {
            strengthText.textContent =
                "ضعیف";
        } else if (length <= 6) {
            strengthText.textContent =
                "متوسط";
        } else if (length <= 10) {
            strengthText.textContent =
                "خوب";
        } else if (length <= 14) {
            strengthText.textContent =
                "قوی";
        } else {
            strengthText.textContent =
                "خیلی قوی";
        }
    });

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