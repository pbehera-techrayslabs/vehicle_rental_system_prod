import { renderNavbar } from "../components/navbar.js";
import { renderFooter } from "../components/footer.js";
import { initAdmin } from "../services/authService.js";
import { showToast } from "../utils/toast.js";

interface Vehicle {
    id: number
    name: string
    type: string
    price: number
    quantity: number
}

const STORAGE_KEYS = {
    VEHICLES: "vehicles",
    SESSION: "session",
    SELECTED_VEHICLE: "selectedVehicle"
}

initAdmin()
function initializeVehicles() {

    const vehicles = localStorage.getItem(STORAGE_KEYS.VEHICLES)

    if (!vehicles) {

        const defaultVehicles: Vehicle[] = [

            { id: 1, name: "Swift Dzire", type: "Car", price: 2000, quantity: 2 },
            { id: 2, name: "Hyundai Verna", type: "Car", price: 3000, quantity: 1 },
            { id: 3, name: "Royal Enfield Classic", type: "Bike", price: 900, quantity: 3 },
            { id: 4, name: "Yamaha R15", type: "Bike", price: 850, quantity: 2 },
            { id: 5, name: "Honda Activa", type: "Scooty", price: 500, quantity: 4 },
            { id: 6, name: "TVS Jupiter", type: "Scooty", price: 450, quantity: 3 }

        ]

        localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(defaultVehicles))

    }

}

function getVehicles(): Vehicle[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.VEHICLES) || "[]")
}

function getAvailability(vehicleId: number, selectedDate?: string) {

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    const vehicles = getVehicles()

    const vehicle = vehicles.find(v => v.id === vehicleId)

    if (!vehicle) {
        return { total: 0, booked: 0, available: 0 }
    }

    let booked = 0

    if (selectedDate) {
        const checkDate = new Date(selectedDate)

        booked = bookings.filter((b: any) => {
            if (b.vehicleId !== vehicleId || b.status === "Cancelled") return false

            const start = new Date(b.startDate)
            const end = new Date(b.endDate)

            return checkDate >= start && checkDate <= end
        }).length
    }

    return {
        total: vehicle.quantity,
        booked,
        available: vehicle.quantity - booked
    }
}

function renderVehicles() {

    const container = document.getElementById("vehicle-container")

    if (!container) return

    const vehicles = getVehicles()

    container.innerHTML = ""

    vehicles.forEach(vehicle => {

        const availability = getAvailability(vehicle.id)

        container.innerHTML += `
        

<div class="bg-white shadow-lg rounded-lg p-6"><h3 class="text-xl font-semibold">${vehicle.name}</h3><p class="text-gray-600 mt-2">Type: ${vehicle.type}</p><p class="text-gray-600">₹${vehicle.price} / day</p><p class="text-sm text-gray-700 mt-2">
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

</button></div>`

    })

}

document.addEventListener("click", (event) => {

    const target = event.target as HTMLElement

    if (target.classList.contains("book-btn")) {

        const session = sessionStorage.getItem(STORAGE_KEYS.SESSION)

        if (!session) {

            showToast("Please login first", "error")

            window.location.href = "login.html"

            return

        }

        const vehicleId = target.getAttribute("data-id")

        localStorage.setItem(STORAGE_KEYS.SELECTED_VEHICLE, vehicleId || "")

        window.location.href = "booking.html"

    }

})

function initPage() {

    renderNavbar()
    renderFooter()

    initializeVehicles()

    renderVehicles()

}

initPage()