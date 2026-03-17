import { hashPassword } from "../services/authService.js";
import { showToast } from "../utils/toast.js";
declare const Swal: any;
const form = document.getElementById("loginForm") as HTMLFormElement;

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value.trim();
    const role = (document.getElementById("role") as HTMLSelectElement).value;

    const admin = JSON.parse(localStorage.getItem("admin") || "{}");
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (!email || !password) {
        showToast("All fields are required", "error");
        return;
    }


    const hashedPassword = await hashPassword(password);
    if (role === "admin") {
        if (email === admin.email && hashedPassword === admin.password) {
            localStorage.setItem("session", JSON.stringify({
                name: "Admin",
                email: admin.email,
                role: "admin"
            }));
            Swal.fire({
                icon: "success",
                title: "Login successful",
                confirmButtonColor: "green"
            }).then(() => {
            window.location.href = "/frontend/src/pages/admin-dashboard.html";
            return;
            })
        }
        else showToast("Invalid admin login", "error");
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
            Swal.fire({
                icon: "success",
                title: "Login successful",
                confirmButtonColor: "green"
            }).then(() => {
                window.location.href = "/frontend/src/pages/user-dashboard.html";
                return;
    })
        }
    
    else showToast("Invalid user login", "error");
    return;
    }
});