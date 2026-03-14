
const session = JSON.parse(localStorage.getItem("session") || "null");

if (!session) {

    alert("Please login");
    window.location.href = "/frontend/src/pages/login.html";

}

const welcomeMessage = document.getElementById("welcomeMessage");
const userSection = document.getElementById("userSection");
if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome, ${session.name}`;
}
if (userSection) {
    userSection.innerHTML = `
<button id="logoutBtn"
class="bg-red-500 px-3 py-1 rounded">
Logout
</button>`;
}
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("session");
    document.cookie = "auth=false";
    alert("you have been logged out");
    window.location.href = "/frontend/index.html";
});