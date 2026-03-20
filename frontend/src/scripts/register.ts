
import { hashPassword } from "../services/authService.js";
import { showToast } from "../utils/toast.js";

declare const Swal: any;
const form = document.getElementById("registerForm") as HTMLFormElement;

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    if (!name || !email || !password) {
        showToast("All fields are required", "error");
        return;
    }

    if (name.length < 3) {
        showToast("Name must be at least 3 characters", "error");
        return;
    }

    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(name)) {
        showToast("Name must contain alphabets and spaces only", "error");
        return;
    }
    const emailRegex = /^[^ ]+@[^ ]+.[a-z]{2,3}$/;
    if (!emailRegex.test(email)) {
        showToast("Enter a valid email", "error");
        return;
    }

    if (password.length < 8) {
        showToast("Password must be at least 8 characters", "error");
        return;
    }
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/;
    if (!passwordPattern.test(password)) {
        showToast("Password must contain at least one letter and number", "error");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.find((u: any) => u.email === email);
    if (userExists) {
        showToast("User already exists with this email",);
        return;
    }

    const hashedPassword = await hashPassword(password);
    const newUser = {
        id: Date.now(),
        name,
        email,
        password: hashedPassword
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    Swal.fire({
        icon: "success",
        title: "Registration successful",
        confirmButtonColor: "green"
    }).then(() => {
        window.location.href = "login.html";
    })

});