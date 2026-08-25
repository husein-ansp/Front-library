document.addEventListener("DOMContentLoaded", () => {
    const form =
        document.getElementById("registerForm");
    const password =
        document.getElementById("password");
    const confirmPassword =
        document.getElementById("confirmPassword");
    const counter =
        document.getElementById("passwordCounter");
    const strength =
        document.getElementById("passwordStrength");
    const strengthBar =
        document.getElementById("strengthBar");
    const strengthText =
        document.getElementById("strengthText");
    const passwordMatch =
        document.getElementById("passwordMatch");

    /* 
    hide password
    */

    function setupPasswordToggle(
        input,
        button
    ) {
        button.addEventListener(
            "click",
            () => {
                if (
                    input.type === "password"
                ) {
                    input.type = "text";
                    button.innerHTML =
                        '<i class="bi bi-eye-slash"></i>';
                } else {
                    input.type = "password";
                    button.innerHTML =
                        '<i class="bi bi-eye"></i>';
                }
            }
        );
    }
    setupPasswordToggle(
        password,
        document.getElementById(
            "togglePassword"
        )
    );
    setupPasswordToggle(
        confirmPassword,
        document.getElementById(
            "toggleConfirmPassword"
        )
    );

    /* 
    password strength
    */

    password.addEventListener(
        "input",
        () => {
            const value =
                password.value;
            const length =
                value.length;

            /*
            counter 
            */

            counter.textContent =
                `${length} / 16`;
                
            /* 
            empty 
            */

            if (length === 0) {
                strength.classList.remove(
                    "visible"
                );
                strengthBar.style.width =
                    "0%";
                strengthText.textContent =
                    "قدرت رمز عبور";
                return;
            }
            strength.classList.add(
                "visible"
            );

            /*
            score 
            */

            let score = 0;
            if (length >= 4) {
                score++;
            }
            if (length >= 8) {
                score++;
            }
            if (length >= 12) {
                score++;
            }
            if (length === 16) {
                score++;
            }
            if (/[a-z]/.test(value)) {
                score++;
            }
            if (/[A-Z]/.test(value)) {
                score++;
            }
            if (/[0-9]/.test(value)) {
                score++;
            }
            if (/[^A-Za-z0-9]/.test(value)) {
                score++;
            }
            const percent =
                Math.min(
                    score * 12.5,
                    100
                );
            strengthBar.style.width =
                `${percent}%`;

            /* 
            text 
            */

            if (score <= 2) {
                strengthText.textContent =
                    "خیلی ضعیف";
            } else if (score <= 3) {
                strengthText.textContent =
                    "ضعیف";
            } else if (score <= 5) {
                strengthText.textContent =
                    "متوسط";
            } else if (score <= 6) {
                strengthText.textContent =
                    "خوب";
            } else if (score <= 7) {
                strengthText.textContent =
                    "قوی";
            } else {
                strengthText.textContent =
                    "خیلی قوی";
            }
        }
    );

    /* 
    password match
    */

    confirmPassword.addEventListener(
        "input",
        checkPasswordMatch
    );
    password.addEventListener(
        "input",
        checkPasswordMatch
    );
    function checkPasswordMatch() {
        if (
            confirmPassword.value === ""
        ) {
            passwordMatch.textContent =
                "";
            passwordMatch.className =
                "password-match";
            return;
        }
        if (
            password.value ===
            confirmPassword.value
        ) {
            passwordMatch.textContent =
                "رمزهای عبور یکسان هستند ✓";
            passwordMatch.className =
                "password-match success";
        } else {
            passwordMatch.textContent =
                "رمزهای عبور یکسان نیستند";
            passwordMatch.className =
                "password-match error";
        }
    }

    /* 
    submit
    */

    form.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();
            if (
                password.value !==
                confirmPassword.value
            ) {
                checkPasswordMatch();
                return;
            }
            const button =
                form.querySelector(
                    ".register-button"
                );
            const oldHTML =
                button.innerHTML;
            button.innerHTML =
                `
                <span>
                    در حال ثبت‌نام...
                </span>
                <i class="bi bi-arrow-repeat spin"></i>
                `;
            button.disabled = true;
            setTimeout(
                () => {
                    button.innerHTML =
                        oldHTML;
                    button.disabled =
                        false;
                },
                1500
            );
        }
    );
});