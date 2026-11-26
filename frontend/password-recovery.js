const requestForm = document.getElementById("requestCodeForm");
const resetForm = document.getElementById("resetPasswordForm");
const message = document.getElementById("recoveryMessage");
const requestButton = requestForm.querySelector("button");
const resetButton = resetForm.querySelector("button");
let requestedEmail = "";

function showRecoveryMessage(text, type) {
    message.textContent = text;
    message.className = "message " + type;
}

requestForm.addEventListener("input", () => {
    resetForm.hidden = requestForm.elements.email.value.trim().toLowerCase() !== requestedEmail;
});

requestForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const emailField = requestForm.elements.email;
    const email = emailField.value.trim().toLowerCase();
    requestButton.disabled = true;
    resetButton.disabled = true;
    emailField.readOnly = true;
    try {
        const data = await api("/api/auth/forgot-password", {
            method: "POST",
            body: JSON.stringify({ email })
        });
        requestedEmail = email;
        resetForm.reset();
        resetForm.hidden = false;
        requestButton.textContent = "Resend Email Code";
        showRecoveryMessage(data.message + " Check your inbox and spam folder.", "success");
        resetForm.elements.code.focus();
    } catch (error) {
        showRecoveryMessage(error.message, "error");
    } finally {
        emailField.readOnly = false;
        resetButton.disabled = false;
        requestButton.disabled = false;
    }
});

resetForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(resetForm);
    const password = form.get("password");
    if (password !== form.get("confirmation")) {
        showRecoveryMessage("The passwords do not match.", "error");
        return;
    }
    resetButton.disabled = true;
    requestButton.disabled = true;
    requestForm.elements.email.readOnly = true;
    try {
        await api("/api/auth/reset-password", {
            method: "POST",
            body: JSON.stringify({ email: requestedEmail, code: form.get("code"), password })
        });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.assign("/login.html?message=password-updated");
    } catch (error) {
        showRecoveryMessage(error.message, "error");
        resetButton.disabled = false;
        requestButton.disabled = false;
        requestForm.elements.email.readOnly = false;
    }
});
