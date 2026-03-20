import { isVehicleBooked, getVehicleBookedDates } from "../services/bookingService.js";
import { showToast } from "../utils/toast.js";

const session = JSON.parse(localStorage.getItem("session") || "null");
declare const Swal:any;
if (!session || session.role !== "user") {
    showToast("Please login first","error");
    window.location.href = "/frontend/src/pages/login.html";
}
const vehicleDetails = document.getElementById("vehicle-details");
const form = document.getElementById("bookingForm") as HTMLFormElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const startInput: any = document.getElementById("startDate") as HTMLInputElement;
const endInput: any = document.getElementById("endDate") as HTMLInputElement;
const totalPriceText = document.getElementById("totalPrice") as HTMLElement;
const vehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");
const vehicleId = Number(localStorage.getItem("selectedVehicle"));
const vehicle = vehicles.find((v: any) => v.id === vehicleId);
if (vehicleDetails && vehicle) {
    vehicleDetails.innerHTML = `

<p class="font-semibold">User: ${session.name}</p><h3 class="text-xl font-semibold">${vehicle.name}</h3><p>${vehicle.type}</p><p class="text-blue-600">₹${vehicle.price} / day</p>`;

}



const today = new Date().toISOString().split("T")[0];
startInput.min = today;
endInput.min = today;
const bookedDates = getVehicleBookedDates(vehicleId);
function isDateBlocked(date: string) {
  const bookings= getVehicleBookedDates(vehicleId);
  const vehicles= JSON.parse(localStorage.getItem("vehicles")|| "[]");
  const vehicle= vehicles.find((v:any)=>v.id===vehicleId);
  const checkDate= new Date(date);
  const count= bookings.filter((b:any)=>{
    const start= new Date(b.startDate);
    const end= new Date(b.endDate);
    return checkDate>= start && checkDate <=end;
  }).length;
  return count>= vehicle.quantity;
}

startInput.addEventListener("change", () => {
    if (isDateBlocked(startInput.value)) {
        showToast("Vehicle already booked on this date","error");
        startInput.value = "";
    }
});

endInput.addEventListener("change", () => {
    if (isDateBlocked(endInput.value)) {
        showToast("Vehicle already booked on this date","error");
        endInput.value = "";
    }
});


function calculatePrice() {
    if (!startInput.value || !endInput.value) return;
    const start = new Date(startInput.value);
    const end = new Date(endInput.value);
    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (10006060 * 24)) + 1;
    if (days <= 0) {
        totalPriceText.textContent = "Invalid date range";
        return;
    }

    const total = days * vehicle.price;
    totalPriceText.textContent = `Total Price: ₹${total} (${days} days)`;
}

startInput.addEventListener("change", calculatePrice);
endInput.addEventListener("change", calculatePrice);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const phone = phoneInput.value.trim();
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        showToast("Enter valid 10 digit phone number","error");
        return;
    }
    const startDate = startInput.value;
    const endDate = endInput.value;
    if (!startDate || !endDate) {
        showToast("Select booking dates","error");
        return;
    }
    if (new Date(startDate) > new Date(endDate)) {
        showToast("End date must be after start date","error");
        return;
    }
    const alreadyBooked = isVehicleBooked(vehicleId, startDate, endDate);
    if (alreadyBooked) {
        showToast("Vehicle already booked for selected dates","error");
        return;
    }
    localStorage.setItem("paymentBooking", JSON.stringify({
        vehicleId: vehicleId,
        userEmail: session.email,
        phone: phone,
        startDate: startDate,
        endDate: endDate
    }));
     Swal.fire({
                icon: "success",
                title: "Proceeding to Payment",
                confirmButtonColor: "green"
            }).then(() => {

    window.location.href = "/frontend/src/pages/payment.html";
            })
});