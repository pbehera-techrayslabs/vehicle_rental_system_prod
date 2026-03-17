const session = JSON.parse(localStorage.getItem("session") || "null");
if (!session || session.role !== "admin") {
    alert("Access denied");
    window.location.href = "/frontend/index.html";
}
const table = document.getElementById("booking-table");
function getVehicles() {
    return JSON.parse(localStorage.getItem("vehicles") || "[]");
}
function getBookings() {
    return JSON.parse(localStorage.getItem("bookings") || "[]");
}
function saveBookings(bookings: any[]) {
    localStorage.setItem("bookings", JSON.stringify(bookings));
}
let bookings = getBookings();
let currentFilter = "All";
let selectedDate = "";
const dateInput = document.getElementById("date-filter") as HTMLInputElement;
function getStatusBadge(status: string) {
    if (status === "Pending") {
        return `<span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm font-semibold">Pending</span>`;
    }
    if (status === "Booked") {
        return `<span class="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">Booked</span>`;
    }
    return `<span class="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-semibold">Cancelled</span>`;
}
function renderBookings() {
    if (!table) return;
    const vehicles = getVehicles();
    table.innerHTML = "";
    const filteredBookings = bookings.filter((b: any) => {
        const statusMatch =
            currentFilter === "All" || b.status === currentFilter;
        const dateMatch =
            !selectedDate ||
            (new Date(selectedDate) >= new Date(b.startDate) &&
                new Date(selectedDate) <= new Date(b.endDate));
        return statusMatch && dateMatch;
    });
    filteredBookings.forEach((b: any) => {
        const vehicle = vehicles.find((v: any) => v.id === b.vehicleId);
        table.innerHTML += `<tr class="border-b hover:bg-gray-50">
        <td class="p-3 text-center">${vehicle?.name || "Unknown"}</td>
        <td class="p-3 text-center">${vehicle?.type || "-"}</td>
        <td class="p-3 text-center">${b.userEmail}</td>
        <td class="p-3 text-center">${b.startDate}</td>
        <td class="p-3 text-center">${b.endDate}</td>
        <td class="p-3 text-center">${getStatusBadge(b.status)}</td>
        <td class="p-3 text-center space-x-2">${b.status === "Pending" ? `<button class="approve-btn bg-green-600 text-white px-3 py-1 rounded" data-id="${ b.id } "> Approve </button>` : ""
    }
${ b.status === "Booked" ? `<button class="cancel-btn bg-red-500 text-white px-3 py-1 rounded" data-id="${ b.id }"> Cancel </button>` : ""}
${ b.status === "Cancelled" ? `<button class="book-btn bg-blue-600 text-white px-3 py-1 rounded" data-id="${ b.id } "> Book Again </button>` : "" }
</td></tr >`;
});
}
document.addEventListener("click", (e) => {
const target = e.target as HTMLElement;
if (target.classList.contains("filter-btn")) {
    currentFilter = target.getAttribute("data-filter") || "All";
    renderBookings();
}
if (target.classList.contains("approve-btn")) {
    const id = Number(target.getAttribute("data-id"));
    bookings = bookings.map((b: any) =>
        b.id === id ? { ...b, status: "Booked" } : b
    );
    saveBookings(bookings);
    renderBookings();
}
if (target.classList.contains("cancel-btn")) {
    const id = Number(target.getAttribute("data-id"));
    bookings = bookings.map((b: any) =>
        b.id === id ? { ...b, status: "Cancelled" } : b
    );
    saveBookings(bookings);
    renderBookings();
}
if (target.classList.contains("book-btn")) {
    const id = Number(target.getAttribute("data-id"));
    bookings = bookings.map((b: any) =>
        b.id === id ? { ...b, status: "Booked" } : b
    );
    saveBookings(bookings);
    renderBookings();
}
});
dateInput?.addEventListener("change", () => {
selectedDate = dateInput.value;
renderBookings();

});

const clearBtn = document.getElementById("clear-date");
clearBtn?.addEventListener("click", () => {
selectedDate = "";
if (dateInput) dateInput.value = "";
renderBookings();
});
renderBookings();