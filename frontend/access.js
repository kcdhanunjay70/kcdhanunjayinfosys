const API_BASE = "";

async function api(url, options = {}) {
    const token = localStorage.getItem("token");
    const headers = options.body instanceof FormData
        ? { ...(token && { Authorization: `Bearer ${token}` }), ...(options.headers || {}) }
        : {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(options.headers || {})
        };

    const res = await fetch(API_BASE + url, {
        ...options,
        headers
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || data.success === false) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}

const store = {};

Object.defineProperty(store, "token", {
    get() {
        return localStorage.getItem("token");
    },
    set(value) {
        localStorage.setItem("token", value);
    }
});

Object.defineProperty(store, "user", {
    get() {
        try {
            return JSON.parse(localStorage.getItem("user") || "null");
        } catch {
            localStorage.removeItem("user");
            return null;
        }
    },
    set(value) {
        localStorage.setItem("user", JSON.stringify(value));
    }
});

function showMessage(text, type = "success") {
    const msg = document.getElementById("message");
    if (!msg) return;

    msg.innerText = text;
    msg.className = "message " + type;

    setTimeout(() => {
        msg.innerText = "";
    }, 4000);
}

function getDeviceId() {
    const key = "kcd_device_id";
    let deviceId = localStorage.getItem(key);

    if (!deviceId) {
        const randomId = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        deviceId = `device-${randomId}`;
        localStorage.setItem(key, deviceId);
    }

    return deviceId;
}

function requireLogin() {
    if (!store.token || !store.user) {
        const currentUrl = `${window.location.pathname}${window.location.search}`;
        window.location.href = `/login.html?redirect=${encodeURIComponent(currentUrl)}&message=login-required`;
        return null;
    }

    return store.user;
}

function fillUser() {
    const user = store.user || {};

    document.querySelectorAll("[data-user-name]").forEach((el) => {
        el.textContent = user.name || "Student";
    });

    document.querySelectorAll("[data-user-email]").forEach((el) => {
        el.textContent = user.email || "";
    });

    document.querySelectorAll("[data-user-phone]").forEach((el) => {
        el.textContent = user.phone || "";
    });

    document.querySelectorAll("[data-user-role]").forEach((el) => {
        el.textContent = user.role || "";
    });
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    const emailInput = registerForm.elements.namedItem("email");
    const phoneInput = registerForm.elements.namedItem("phone");
    const submitButton = registerForm.querySelector('button[type="submit"]');
    const resultBox = document.getElementById("registrationResult");
    const idText = document.getElementById("generatedStudentId");
    const copyButton = document.getElementById("copyStudentId");
    const resultLoginLink = document.getElementById("resultLoginLink");

    // A browser may autofill an old phone number into the email field.
    // Never silently move user data between fields: ask for a valid email.
    emailInput?.addEventListener("input", () => emailInput.setCustomValidity(""));
    phoneInput?.addEventListener("input", () => phoneInput.setCustomValidity(""));
    copyButton?.addEventListener("click", async () => {
        const studentId = idText?.textContent || "";
        if (!studentId) return;
        try {
            await navigator.clipboard.writeText(studentId);
            copyButton.textContent = "Copied!";
        } catch {
            showMessage("Select and copy your Student ID manually.", "error");
        }
    });

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formElement = event.currentTarget;
        const form = new FormData(formElement);
        const params = new URLSearchParams(window.location.search);
        const redirectTo = params.get("redirect");
        const name = String(form.get("name") || "").trim();
        const email = String(form.get("email") || "").trim();
        const phone = String(form.get("phone") || "").trim();
        const password = String(form.get("password") || "");

        if (name.length < 2) return showMessage("Please enter your full name (at least 2 characters).", "error");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailInput?.setCustomValidity("Please enter a valid email address, e.g. student@example.com (not a phone number).");
            emailInput?.reportValidity();
            return;
        }
        if (!/^[0-9]{10}$/.test(phone)) {
            phoneInput?.setCustomValidity("Enter exactly 10 digits without +91 or leading zero.");
            phoneInput?.reportValidity();
            return;
        }
        if (password.length < 8 || password.length > 128) return showMessage("Password must be 8–128 characters.", "error");

        submitButton.disabled = true;
        submitButton.textContent = "Registering...";
        try {
            const data = await api("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, email, phone, password })
            });
            if (!data.username) throw new Error("Registration completed, but Student ID was not returned. Contact support before retrying.");
            idText.textContent = data.username;
            if (resultLoginLink) resultLoginLink.href = redirectTo
                ? `/login.html?redirect=${encodeURIComponent(redirectTo)}`
                : "/login.html";
            resultBox.hidden = false;
            formElement.hidden = true;
            showMessage("Registration successful. Save your Student ID shown below.");
            // Do not auto-redirect: students must have time to copy their ID.
        } catch (err) {
            showMessage(err.message, "error");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Register";
        }
    });
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login.html";
}
