import { getVehicles } from "../services/vehicleService.js";
interface Vehicle {
    id: number
    name: string
    type: string
    price: number
    quantity: number
}
const session = JSON.parse(localStorage.getItem("session") || "{}");
const container = document.getElementById("vehicle-container") as HTMLElement;
if (!container) throw new Error("Vehicle container not found");
function getVehicleIcon(type: string) {
    const t = type.toLowerCase();
    if (t.includes("car")) return "🚗";
    if (t.includes("bike")) return "🏍️";
    if (t.includes("scooty") || t.includes("scooter")) return "🛵";
    return "🚘";
}
function getVehicleAvailability(vehicleId: number) {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const vehicles: Vehicle[] = getVehicles();
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) {
        return {
            total: 0,
            booked: 0,
            available: 0
        };
    }
    const quantity = vehicle.quantity;
    const activeBookings = bookings.filter((b: any) =>
        b.vehicleId === vehicleId &&
        b.status !== "Cancelled"
    );
    const bookedCount = activeBookings.length;
    return {
        total: quantity,
        booked: bookedCount,
        available: quantity - bookedCount
    };
}
function renderVehicles() {
    const vehicles = getVehicles();
    container.innerHTML = "";
    vehicles.forEach((vehicle: Vehicle) => {
        const availability = getVehicleAvailability(vehicle.id);
        const icon = getVehicleIcon(vehicle.type);
        container.innerHTML += `
<div class="bg-white shadow-lg rounded-lg p-6"><h3 class="text-xl font-semibold">
${icon} ${vehicle.name}
</h3><p class="text-gray-600 mt-2">
Type: ${vehicle.type}
</p><p class="text-gray-600">
₹${vehicle.price} / day
</p><p class="text-sm mt-2 text-gray-700">
Total Units: ${availability.total}
</p><p class="text-sm text-red-500">
Booked: ${availability.booked}
</p><p class="text-sm text-green-600 font-semibold">
Available: ${availability.available}
</p><button
data-id="${vehicle.id}"
${availability.available <= 0 ? "disabled" : ""}
class="book-btn mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
Book Now
</button></div>`;
    });
}
document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("book-btn")) {
        if (!session || session.role !== "user") {
            alert("Please login as user");
            window.location.href = "/frontend/src/pages/login.html";
            return;
        }
        const vehicleId = target.getAttribute("data-id");
        localStorage.setItem("selectedVehicle", vehicleId || "");
        window.location.href = "/frontend/src/pages/booking.html";
    }
});
renderVehicles();