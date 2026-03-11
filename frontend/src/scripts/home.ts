import { renderNavbar } from "../components/navbar.js";
import { renderFooter } from "../components/footer.js";

/* ---------------- VEHICLE TYPE ---------------- */
interface Vehicle {
    id: number;
    name: string;
    type: string;
    price: number;
}
/* ---------------- STORAGE KEYS ---------------- */
const STORAGE_KEYS = {
    VEHICLES: "vehicles",
    SESSION: "session",
    SELECTED_VEHICLE: "selectedVehicle"
};
/* ---------------- INITIAL VEHICLE DATA ---------------- */
function initializeVehicles() {

    const vehicles = localStorage.getItem(STORAGE_KEYS.VEHICLES);

    if (!vehicles) {

        const defaultVehicles: Vehicle[] = [

            { id: 1, name: "Swift Dzire", type: "Car", price: 2000 },
            { id: 2, name: "Hyundai Verna", type: "Car", price: 3000 },

            { id: 3, name: "Royal Enfield Classic", type: "Bike", price: 900 },
            { id: 4, name: "Yamaha R15", type: "Bike", price: 850 },

            { id: 5, name: "Honda Activa", type: "Scooty", price: 500 },
            { id: 6, name: "TVS Jupiter", type: "Scooty", price: 450 }

        ];

        localStorage.setItem(
            STORAGE_KEYS.VEHICLES,
            JSON.stringify(defaultVehicles)
        );

    }

}
/* ---------------- GET VEHICLES ---------------- */
function getVehicles(): Vehicle[] {

    const vehicles = localStorage.getItem(STORAGE_KEYS.VEHICLES);

    return vehicles ? JSON.parse(vehicles) : [];

}
/* ---------------- RENDER VEHICLES ---------------- */

function renderVehicles() {

    const container = document.getElementById("vehicle-container");
    if (!container) return;
    const vehicles = getVehicles();
    container.innerHTML = "";

    vehicles.forEach(vehicle => {

        container.innerHTML += `
        
        <div class="bg-white shadow-lg rounded-lg p-6">
            <h3 class="text-xl font-semibold">
                ${vehicle.name}
            </h3>

            <p class="text-gray-600 mt-2">
                Type: ${vehicle.type}
            </p>

            <p class="text-gray-600">
                ₹${vehicle.price} / day
            </p>

            <button 
            data-id="${vehicle.id}"
            class="book-btn mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">

            Book Now

            </button>

        </div>
        `;
    });
}
/* ---------------- BOOKING LOGIC ---------------- */

document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains("book-btn")) {
        const session = sessionStorage.getItem(STORAGE_KEYS.SESSION);
        if (!session) {
            alert("Please login first");
            window.location.href = "/frontend/src/pages/login.html";
            return;
        }
        const vehicleId = target.getAttribute("data-id");
        localStorage.setItem(
            STORAGE_KEYS.SELECTED_VEHICLE,
            vehicleId || ""
        );
        window.location.href = "/frontend/src/pages/booking.html";
    }

});


/* ---------------- INITIALIZE PAGE ---------------- */
function initPage() {
    renderNavbar();
    renderFooter();
    initializeVehicles();
    renderVehicles();

}

initPage();