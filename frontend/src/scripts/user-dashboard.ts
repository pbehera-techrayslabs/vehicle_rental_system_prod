declare const Swal:any;
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
   Swal.fire({
        title: "Logout?",
        text: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonCancel: "#d33",
        confirmButtonText: "Yes, Logout."
    }).then((result: any) => {
        if (result.isConfirmed) {
            localStorage.removeItem("session");
            document.cookie = "auth=false";
            window.location.href = "/frontend/src/pages/login.html";
        }
    })
});