import { getVehicleBookedDates } from "../services/bookingService.js";
import { showToast } from "../utils/toast.js";

declare const Swal: any;
declare const flatpickr: any;

const session = JSON.parse(localStorage.getItem("session") || "null");

if (!session || session.role !== "user") {
    showToast("Please login first", "error");
    window.location.href = "login.html";
}
const vehicleDetails = document.getElementById("vehicle-details");
const form = document.getElementById("bookingForm") as HTMLFormElement | null;
const phoneInput = document.getElementById("phone") as HTMLInputElement | null;
const startInput = document.getElementById("startDate") as HTMLInputElement | any;
const endInput = document.getElementById("endDate") as HTMLInputElement | any;
const totalPriceText = document.getElementById("totalPrice") as HTMLElement | any;

if (!form || !phoneInput || !startInput || !endInput || !totalPriceText) {
    throw new Error("Required elements not found in DOM");
}

const vehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");
const vehicleId = Number(localStorage.getItem("selectedVehicle"));
const vehicle = vehicles.find((v: any) => v.id === vehicleId);
if (vehicleDetails && vehicle) {
    vehicleDetails.innerHTML = `
        <p class="font-semibold">User: ${session.name}</p>
        <h3 class="text-xl font-semibold">${vehicle.name}</h3>
        <p>${vehicle.type}</p>
        <p class="text-blue-600">₹${vehicle.price} / day</p>
    `;
}

const today = new Date().toISOString().split("T")[0];
startInput.min = today;
endInput.min = today;

function isDateBlocked(date: string) {
    if (!date) return false;

    const bookings = getVehicleBookedDates(vehicleId);
    const vehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");
    const vehicle = vehicles.find((v: any) => v.id === vehicleId);

    const checkDate = new Date(date);

    const count = bookings.filter((b: any) => {
        const start = new Date(b.startDate);
        const end = new Date(b.endDate);
        return checkDate >= start && checkDate <= end;
    }).length;

    return count >= vehicle.quantity;
}

function isRangeBlocked(start: string, end: string) {
    if (!start || !end) return false;

    let current = new Date(start);
    const last = new Date(end);

    while (current <= last) {
        const local = new Date(current.getTime() - current.getTimezoneOffset() * 60000);
        const dateStr : any = local.toISOString().split("T")[0];

        if (isDateBlocked(dateStr)) {
            return true;
        }

        current.setDate(current.getDate() + 1);
    }

    return false;
}

function disableBookedDates(input: HTMLInputElement) {
    input.addEventListener("change", () => {
        const value = input.value || "";

        if (!value) return;

        if (isDateBlocked(value)) {
            showToast("This date is fully booked", "error");
            input.value = "";
        }
    });
}

disableBookedDates(startInput);
disableBookedDates(endInput);

startInput.addEventListener("change", () => {
    endInput.value = "";
    endInput.min = startInput.value;
});

function calculatePrice() {
    if (!startInput.value || !endInput.value) return;

    const start = new Date(startInput.value || "");
    const end = new Date(endInput.value || "");

    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;

    if (days <= 0) {
        totalPriceText.textContent = "Invalid date range";
        return;
    }

    const total = days * vehicle.price;
    totalPriceText.textContent = `Total Price: ₹${total} (${days} days)`;
}

startInput.addEventListener("change", calculatePrice);
endInput.addEventListener("change", calculatePrice);

function getBlockedDates() {
    const bookings = getVehicleBookedDates(vehicleId);
    const vehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");
    const vehicle = vehicles.find((v: any) => v.id === vehicleId);

    const blocked: string[] = [];

    bookings.forEach((b: any) => {
        let current = new Date(b.startDate);
        const end = new Date(b.endDate);

        while (current <= end) {

            const local = new Date(current.getTime() - current.getTimezoneOffset() * 60000);
            const dateStr : any= local.toISOString().split("T")[0];

            // count bookings per day
            const count = bookings.filter((x: any) => {
                const s = new Date(x.startDate);
                const e = new Date(x.endDate);
                return current >= s && current <= e;
            }).length;

            if (count >= vehicle.quantity) {
                blocked.push(dateStr);
            }

            current.setDate(current.getDate() + 1);
        }
    });

    return [...new Set(blocked)];
}

//  FORM SUBMIT
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const phone = phoneInput.value.trim();
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
        showToast("Enter valid 10 digit phone number", "error");
        return;
    }

    const startDate = startInput.value || "";
    const endDate = endInput.value || "";

    if (!startDate || !endDate) {
        showToast("Select booking dates", "error");
        return;
    }

    if (new Date(startDate) > new Date(endDate)) {
        showToast("End date must be after start date", "error");
        return;
    }

    //  Range check
    if (isRangeBlocked(startDate, endDate)) {
        showToast("Some dates in selected range are unavailable", "error");
        return;
    }

    //  Save booking for payment
    localStorage.setItem("paymentBooking", JSON.stringify({
        vehicleId,
        userEmail: session.email,
        phone,
        startDate,
        endDate
    }));
    Swal.fire({
        icon: "success",
        title: "Proceeding to Payment",
        confirmButtonColor: "green"
    }).then(() => {
        window.location.href = "payment.html";
    });
});
const blockedDates = getBlockedDates();

const startPicker = flatpickr(startInput, {
    dateFormat: "Y-m-d",
    minDate: "today",
    disable: blockedDates,
    onChange: function (selectedDates: Date[], dateStr: string) {
        endPicker.set("minDate", dateStr);
    }
});

const endPicker = flatpickr(endInput, {
    dateFormat: "Y-m-d",
    minDate: "today",
    disable: blockedDates
});
