const session = JSON.parse(localStorage.getItem("session") || "null");
if (!session || session.role !== "user") {
    alert("Please login");
    window.location.href = "/frontend/src/pages/login.html";
}
const container = document.getElementById("booking-container");
function getVehicles() {
    return JSON.parse(localStorage.getItem("vehicles") || "[]");
}
function getBookings() {
    return JSON.parse(localStorage.getItem("bookings") || "[]");
}
function renderBookings() {
    if (!container) return;
    const bookings = getBookings();
    const vehicles = getVehicles();
    const userBookings = bookings.filter(
        (b: any) => b.userEmail === session.email
    );
    container.innerHTML = "";
    userBookings.forEach((b: any) => {
        const vehicle = vehicles.find((v: any) => v.id === b.vehicleId);
        let statusColor = "text-yellow-500";
        if (b.status === "Booked") {
            statusColor = "text-green-600";
        }
        if (b.status === "Cancelled") {
            statusColor = "text-red-500";
        }
        container.innerHTML += `
<div class="bg-white shadow-lg rounded-lg p-5"><h3 class="text-xl font-semibold">${vehicle?.name}</h3><p>${vehicle?.type}</p><p class="mt-2">Booking Date: ${b.date}</p><p class="font-semibold ${statusColor}">
Status: ${b.status}
</p></div>`;
    });

}

renderBookings();
window.addEventListener("storage", () => {
    renderBookings();
});