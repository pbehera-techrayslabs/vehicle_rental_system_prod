declare const Swal: any;

const session = JSON.parse(localStorage.getItem("session") || "null");

if (!session || session.role !== "admin") {

    Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Admin login required"
    }).then(() => {
        window.location.href = "/frontend/index.html";
    });

}
const form = document.getElementById("vehicleForm") as HTMLFormElement;
const vehicleList = document.getElementById("vehicle-list") as HTMLElement;
const vehicleCount = document.getElementById("vehicleCount") as HTMLElement;
const searchInput = document.getElementById("searchVehicle") as HTMLInputElement;
const filterType = document.getElementById("filterType") as HTMLSelectElement;
const idInput = document.getElementById("vehicleId") as HTMLInputElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const typeInput = document.getElementById("type") as HTMLSelectElement;
const priceInput = document.getElementById("price") as HTMLInputElement;
const quantityInput = document.getElementById("quantity") as HTMLInputElement;
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
const formTitle = document.getElementById("formTitle") as HTMLElement;

function getVehicles() {
    return JSON.parse(localStorage.getItem("vehicles") || "[]")
}
function saveVehicles(vehicles: any[]) {
    localStorage.setItem("vehicles", JSON.stringify(vehicles))
}

function getVehicleAvailability(vehicleId: number) {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    const vehicles = getVehicles()
    const vehicle = vehicles.find((v: any) => v.id === vehicleId)
    if (!vehicle) {
        return { total: 0, booked: 0, available: 0 }
    }
    const booked = bookings.filter((b: any) =>

        b.vehicleId === vehicleId &&
        b.status !== "Cancelled"

    ).length
    return {
        total: vehicle.quantity,
        booked: booked,
        available: vehicle.quantity - booked
    }

}

function renderVehicles(list: any[] = getVehicles()) {
    vehicleList.innerHTML = ""
    list.forEach((v: any) => {
        const card = document.createElement("div")
        card.className = "bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition"
        const availability = getVehicleAvailability(v.id)
        card.innerHTML = `
<h3 class="text-xl font-bold text-gray-800">
${v.name}
</h3><p class="text-gray-500">
${v.type}
</p><p class="text-blue-600 font-semibold mt-2">
₹${v.price}/day
</p><p class="text-gray-700 text-sm">
Total Units: ${availability.total}
</p><p class="text-red-500 text-sm">
Booked: ${availability.booked}
</p><p class="text-green-600 text-sm">
Available: ${availability.available}
</p><div class="mt-4 flex gap-2"><button
class="edit-btn bg-yellow-500 text-white px-3 py-1 rounded"
data-id="${v.id}">
Edit
</button>

<button
class="delete-btn bg-red-500 text-white px-3 py-1 rounded"
data-id="${v.id}">
Delete
</button>

</div>`
        vehicleList.appendChild(card)
    })
    vehicleCount.textContent = list.length.toString()

}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const id = idInput.value
    const name = nameInput.value.trim()
    const type = typeInput.value
    const price = Number(priceInput.value)
    const quantity = Number(quantityInput.value)
    let vehicles = getVehicles()
    const nameRegex = /^(?!\d+$)[A-Za-z][A-Za-z0-9 ]*$/;
    if (!nameRegex.test(name)) {
        Swal.fire({
            icon: "warning",
            title: "Invalid Name",
            text: "Enter a valid vehicle name"
        })
        return
    }
    if (id) {
        vehicles = vehicles.map((v: any) =>
            v.id == id
                ? { id: Number(id), name, type, price, quantity }
                : v
        )
        Swal.fire({
            icon: "success",
            title: "Vehicle Updated"
        })
        submitBtn.textContent = "Add Vehicle"
        formTitle.textContent = "Add Vehicle"
    }
    else {
        vehicles.push({
            id: Date.now(),
            name,
            type,
            price,
            quantity
        })
        Swal.fire({
            icon: "success",
            title: "Vehicle Added"
        })
    }
    saveVehicles(vehicles)
    form.reset()
    idInput.value = ""
    renderVehicles()
})
document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement
    let vehicles = getVehicles()
    if (target.classList.contains("delete-btn")) {
        const id = Number(target.getAttribute("data-id"))
        Swal.fire({
            title: "Delete Vehicle?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then((result: any) => {
            if (result.isConfirmed) {
                vehicles = vehicles.filter((v: any) => v.id !== id)
                saveVehicles(vehicles)
                Swal.fire({
                    icon: "success",
                    title: "Vehicle Deleted"
                })
                renderVehicles()
            }
        })
    }
    if (target.classList.contains("edit-btn")) {
        const id = Number(target.getAttribute("data-id"))
        const vehicle = vehicles.find((v: any) => v.id === id)
        Swal.fire({
            title: "update Vehicle?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Update"
        }).then((result: any) => {
            if (vehicle) {
                idInput.value = vehicle.id
                nameInput.value = vehicle.name
                typeInput.value = vehicle.type
                priceInput.value = vehicle.price
                quantityInput.value = vehicle.quantity
                submitBtn.textContent = "Update Vehicle"
                formTitle.textContent = "Update Vehicle"
            }
        });
    }
})
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase()
    const vehicles = getVehicles()
    const filtered = vehicles.filter((v: any) =>
        v.name.toLowerCase().includes(query)
    )
    renderVehicles(filtered)
})
filterType.addEventListener("change", () => {
    const vehicles = getVehicles()
    const selectedType = filterType.value
    let filtered = vehicles
    if (selectedType !== "All") {
        filtered = vehicles.filter((v: any) => v.type === selectedType)
    }
    renderVehicles(filtered)
})
renderVehicles()