import { addBooking, isVehicleBooked } from "../services/bookingService";
const session = JSON.parse(localStorage.getItem("session") || "null");
if (!session || session.role !== "user") {
    alert("Please login first");
    window.location.href = "/frontend/src/pages/login.html";
}
const vehicleDetails = document.getElementById("vehicle-details");
const form = document.getElementById("bookingForm") as HTMLFormElement;
const vehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");
const vehicleId = Number(localStorage.getItem("selectedVehicle"));
const vehicle = vehicles.find((v: any) => v.id === vehicleId);
if (vehicleDetails && vehicle) {
    vehicleDetails.innerHTML = `
        <h3 class="text-xl font-semibold">${vehicle.name}</h3>
        <p>${vehicle.type}</p>
        <p>₹${vehicle.price} / day</p>
    `;
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const date = (document.getElementById("date") as HTMLInputElement).value;
    if (!date) {
        alert("Select booking date");
        return;
    }
    const alreadyBooked = isVehicleBooked(vehicleId, date);
    if (alreadyBooked) {
        alert("Vehicle already booked for this date");
        return;
    }
    addBooking({
        id: Date.now(),
        vehicleId: vehicleId,
        userEmail: session.email,
        date: date,
        status: "Pending"
    });
    alert("Booking request sent for approval");
    window.location.href = "/frontend/src/pages/my-bookings.html";
});