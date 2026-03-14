import { hashPassword } from "../services/authService.js";

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
        alert("All fields are required");
        return;
    }

    if (name.length < 3) {
        alert("Name must be at least 3 characters");
        return;
    }

    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(name)) {
        alert("Name must contain alphabets and spaces only");
        return;
    }
    const emailRegex = /^[^ ]+@[^ ]+.[a-z]{2,3}$/;
    if (!emailRegex.test(email)) {
        alert("Enter a valid email");
        return;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters");
        return;
    }
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/;
    if (!passwordPattern.test(password)) {
        alert("Password must contain at least one letter and number");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.find((u: any) => u.email === email);
    if (userExists) {
        alert("User already exists with this email");
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
    alert("Registration successful");
    window.location.href = "/frontend/src/pages/login.html";
});