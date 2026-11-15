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
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formElement = event.currentTarget;
        const form = new FormData(formElement);
        const params = new URLSearchParams(window.location.search);
        const redirectTo = params.get("redirect");

        try {
            const data = await api("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    name: form.get("name"),
                    email: form.get("email"),
                    phone: form.get("phone"),
                    password: form.get("password")
                })
            });

            showMessage(`Registration successful! Your User ID is ${data.username}. Login with User ID, email or mobile and your password.`);
            formElement.reset();

            setTimeout(() => {
                window.location.href = redirectTo
                    ? `/login.html?redirect=${encodeURIComponent(redirectTo)}`
                    : "/login.html";
            }, 3000);
        } catch (err) {
            showMessage(err.message, "error");
        }
    });
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login.html";
}
