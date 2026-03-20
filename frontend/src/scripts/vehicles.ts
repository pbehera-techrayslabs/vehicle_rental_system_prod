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
function getVehicleAvailability(vehicleId: number, selectedDate?: string) {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const vehicles: Vehicle[] = getVehicles();

    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) {
        return { total: 0, booked: 0, available: 0 };
    }

    let booked = 0;

    if (selectedDate) {
        const checkDate = new Date(selectedDate);

        booked = bookings.filter((b: any) => {
            if (b.vehicleId !== vehicleId || b.status === "Cancelled") return false;

            const start = new Date(b.startDate);
            const end = new Date(b.endDate);

            return checkDate >= start && checkDate <= end;
        }).length;
    }

    return {
        total: vehicle.quantity,
        booked,
        available: vehicle.quantity - booked
    };
}
function getAvailabilityIndicator(available:number,total:number){

if(available === 0){
return `<p class="text-red-600 font-semibold">🔴 Fully Booked</p>`;
}

if(available <= Math.ceil(total/2)){
return `<p class="text-yellow-600 font-semibold">🟡 Limited Availability</p>`;
}

return `<p class="text-green-600 font-semibold">🟢 Available</p>`;

}
function renderVehicles() {
    const vehicles = getVehicles();
    container.innerHTML = "";
    vehicles.forEach((vehicle: Vehicle) => {
        const availability = getVehicleAvailability(vehicle.id);
        const icon = getVehicleIcon(vehicle.type);
        const indicator = getAvailabilityIndicator(availability.available,availability.total);
        container.innerHTML += `
        
<div class="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transform hover:-translate-y-2 transition duration-300 ">
<h3 class="text-xl font-semibold">
${icon} ${vehicle.name}
</h3><p class="text-gray-600 mt-2">
Type: ${vehicle.type}
</p><p class="text-gray-600">
₹${vehicle.price} / day
</p>
${indicator}<button
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