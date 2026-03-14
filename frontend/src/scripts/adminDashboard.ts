const session = JSON.parse(localStorage.getItem("session") || "null");

if (!session || session.role !== "admin") {
    alert("Access denied");
    window.location.href = "/frontend/index.html";
}
function getVehicles() {
    return JSON.parse(localStorage.getItem("vehicles") || "[]");
}
function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

function getBookings() {
    return JSON.parse(localStorage.getItem("bookings") || "[]");
}
function loadStats() {
    const vehicles = getVehicles();
    const users = getUsers();
    const bookings = getBookings();
    const today = new Date().toISOString().split("T")[0];
    const pendingBookings = bookings.filter((b: any) => b.status === "Pending");
    const bookedBookings = bookings.filter((b: any) => b.status === "Booked");
    const totalActiveBookings = pendingBookings.length + bookedBookings.length;
    const todayBookings = bookings.filter((b: any) =>
        b.date === today && (b.status === "Pending" || b.status === "Booked")
    );
    (document.getElementById("totalVehicles") as HTMLElement).textContent =
        vehicles.length.toString();
    (document.getElementById("totalUsers") as HTMLElement).textContent =
        users.length.toString();
    (document.getElementById("totalBookings") as HTMLElement).textContent =
        totalActiveBookings.toString();
    (document.getElementById("todayBookings") as HTMLElement).textContent =
        todayBookings.length.toString();
    (document.getElementById("pendingBookings") as HTMLElement).textContent =
        pendingBookings.length.toString();
    (document.getElementById("bookedBookings") as HTMLElement).textContent =
        bookedBookings.length.toString();

}
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("session");
    document.cookie = "auth=false";
    alert("you have been logged out");
    window.location.href = "/frontend/src/pages/login.html";
});
loadStats();