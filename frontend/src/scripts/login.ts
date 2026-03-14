import { hashPassword } from "../services/authService.js";

const form = document.getElementById("loginForm") as HTMLFormElement;

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value.trim();
    const role = (document.getElementById("role") as HTMLSelectElement).value;

    const admin = JSON.parse(localStorage.getItem("admin") || "{}");
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const hashedPassword = await hashPassword(password);
    if (role === "admin") {
        if (email === admin.email && hashedPassword === admin.password) {
            localStorage.setItem("session", JSON.stringify({
                name: "Admin",
                email: admin.email,
                role: "admin"
            }));
            window.location.href = "/frontend/src/pages/admin-dashboard.html";
            return;
        }
        alert("Invalid admin login");
        return;
    }
    if (role === "user") {
        const user = users.find((u: any) =>
            u.email === email && u.password === hashedPassword
        );
        if (user) {
            localStorage.setItem("session", JSON.stringify({
                name: user.name,
                email: user.email,
                role: "user"
            }));
            window.location.href = "/frontend/src/pages/user-dashboard.html";
            return;
        }
        alert("Invalid user login");
    }
});