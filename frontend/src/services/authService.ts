const ADMIN_KEY = "admin";
const SESSION_KEY = "session";
export async function hashPassword(password: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map(b => ("0" + b.toString(16)).slice(-2))
        .join("");
    return hashHex;
}
export async function initAdmin() {
    if (!localStorage.getItem(ADMIN_KEY)) {
        const hashedPassword = await hashPassword("admin123");
        const admin = {
            email: "admin@admin.com",
            password: hashedPassword,
            role: "admin"
        };
        localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
    }
}
export async function login(email: string, password: string) {
    const admin = JSON.parse(localStorage.getItem(ADMIN_KEY) || "{}");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const hashedPassword = await hashPassword(password);
    if (email === admin.email && hashedPassword === admin.password) {
        const session = { email, role: "admin" };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        document.cookie = "auth=true";
        return session;
    }
    const user = users.find((u: any) =>
        u.email === email &&
        u.password === hashedPassword
    );
    if (user) {
        const session = { email, role: "user", name: user.name };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        document.cookie = "auth=true";
        return session;
    }
    return null;
}
export function getSession() {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
}
export function logout() {
    localStorage.removeItem(SESSION_KEY);
    document.cookie = "auth=false";
}