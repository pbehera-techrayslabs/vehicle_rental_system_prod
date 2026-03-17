declare const Swal: any;
const session = JSON.parse(localStorage.getItem("session") || "null");
if (!session || session.role !== "user") {

    Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "User login required"
    }).then(() => {
        window.location.href = "/frontend/index.html";
    });

}

const details = document.getElementById("payment-details");
const payBtn = document.getElementById("payBtn");

const vehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");

const bookingData = JSON.parse(localStorage.getItem("paymentBooking") || "null");

if (!bookingData) {

    Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "User login required"
    }).then(() => {
        window.location.href = "/frontend/src/pages/vehicles.html";
    });

}

const vehicle = vehicles.find((v: any) => v.id === bookingData.vehicleId);


const start = new Date(bookingData.startDate);
const end = new Date(bookingData.endDate);

const diff = end.getTime() - start.getTime();

const days = Math.ceil(diff / (10006060 * 24)) + 1;

const total = days * vehicle.price;
if (details) {

    details.innerHTML = `

<p><strong>User:</strong> ${session.name}</p><p><strong>Vehicle:</strong> ${vehicle.name}</p><p><strong>Phone:</strong> ${bookingData.phone}</p><p><strong>Start Date:</strong> ${bookingData.startDate}</p><p><strong>End Date:</strong> ${bookingData.endDate}</p><p><strong>Total Days:</strong> ${days}</p><p class="text-green-600 font-bold mt-2">
Total Amount: ₹${total}
</p>`;

}



payBtn?.addEventListener("click", () => {

    let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    bookings.push({

        id: Date.now(),
        vehicleId: bookingData.vehicleId,
        userEmail: bookingData.userEmail,
        phone: bookingData.phone,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        status: "Pending"

    });

    localStorage.setItem("bookings", JSON.stringify(bookings));

    localStorage.removeItem("paymentBooking");

    alert("Payment successful. Booking request sent.");

    window.location.href = "/frontend/src/pages/my-bookings.html";

});