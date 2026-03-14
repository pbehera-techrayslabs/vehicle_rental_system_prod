const session = JSON.parse(localStorage.getItem("session") || "{}");
const container: any = document.getElementById("vehicle-container");
if (!container) throw new Error("Vehicle container not found");
function getVehicles() {
    return JSON.parse(localStorage.getItem("vehicles") || "[]");
}

function getVehicleIcon(type: string) {
    const t = type.toLowerCase();
    if (t.includes("car")) return "🚗";
    if (t.includes("bike")) return "🏍️";
    if (t.includes("scooty") || t.includes("scooter")) return "🛵";
    return "🚘";
}
/* RENDER VEHICLES */
function renderVehicles() {
    const vehicles = getVehicles();
    container.innerHTML = "";
    vehicles.forEach((v: any) => {
        container.innerHTML += `

<div class="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl hover:scale-105 transition duration-300">
<div class="text-5xl mb-4">
${getVehicleIcon(v.type)}
</div>
<h3 class="text-xl font-semibold">
${v.name}
</h3>
<p class="text-gray-500">
${v.type}
</p>
<p class="text-blue-600 font-bold mt-2">
₹${v.price} / day
</p>
<button
class="book-btn bg-blue-600 text-white px-4 py-2 mt-4 rounded w-full hover:bg-blue-700"
data-id="${v.id}">
Book
</button>
</div>
`;
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