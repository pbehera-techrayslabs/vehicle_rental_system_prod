declare const Swal: any;

const session = JSON.parse(localStorage.getItem("session") || "{}");

if (!session || session.role !== "user") {
    Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first"
    }).then(() => {
        window.location.href = "login.html";
    });
}
const container = document.getElementById("booking-container");
function getVehicles() {
    return JSON.parse(localStorage.getItem("vehicles") || "[]");
}
function getBookings() {
    return JSON.parse(localStorage.getItem("bookings") || "[]");
}

function saveBookings(bookings: any[]) {
    localStorage.setItem("bookings", JSON.stringify(bookings));
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
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startDate = new Date(b.startDate);
        const canCancel = startDate > today && b.status !=="Cancelled";
        container.innerHTML += `
<div class="bg-white shadow-lg p-6 rounded-lg"><h3 class="text-xl font-semibold">
${vehicle?.name || "Vehicle"}
</h3><p class="text-gray-600">
Type: ${vehicle?.type || "-"}
</p><p class="text-gray-600">
Start Date: ${b.startDate}
</p><p class="text-gray-600">
End Date: ${b.endDate}
</p><p class="${b.status === "Cancelled"
                ? "text-red-500 font-semibold"
                : b.status === "Pending"
                    ? "text-yellow-600 font-semibold"
                    : "text-green-600 font-semibold"
            }">
Status: ${b.status}
</p>${canCancel ? `<button class="cancel-booking-btn bg-red-500 text-white px-4 py-1 rounded mt-3 hover:bg-red-600" data-id="${ b.id } ">
 Cancel Booking 
 </button>` : ""
    }
</div>`;
});
}

document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("cancel-booking-btn")) {
        const id = Number(target.getAttribute("data-id"));
        let bookings = getBookings();
        const booking = bookings.find((b: any) => b.id === id);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startDate = new Date(booking.startDate);
        const canCancel=startDate > today && booking.status !=="Cancelled";

        if (startDate <= today) {
            Swal.fire({
                icon: "error",
                title: "Cancellation Blocked",
                text: "Booking cannot be cancelled after start date"
            });
            return;
        }

        Swal.fire({
            title: "Cancel Booking?",
            text: "Are you sure you want to cancel this booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel"
        }).then((result: any) => {
            if (result.isConfirmed) {
                bookings = bookings.map((b: any) =>
                    b.id === id
                        ? { ...b, status: "Cancelled" }
                        : b
                );
                saveBookings(bookings);
                Swal.fire({
                    icon: "success",
                    title: "Booking Cancelled",
                    text: "Your booking has been cancelled successfully"
                });
                renderBookings();
            }
        });
    }
});
renderBookings();