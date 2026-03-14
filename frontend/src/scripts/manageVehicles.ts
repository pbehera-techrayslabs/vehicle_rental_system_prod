
const session = JSON.parse(localStorage.getItem("session") || "null");
if (!session || session.role !== "admin") {
    alert("Access denied");
    window.location.href = "/frontend/index.html";
}

const filterType = document.getElementById("filterType") as HTMLSelectElement;
const form = document.getElementById("vehicleForm") as HTMLFormElement;
const vehicleList = document.getElementById("vehicle-list");
const vehicleCount = document.getElementById("vehicleCount");
const searchInput = document.getElementById("searchVehicle") as HTMLInputElement;

const idInput = document.getElementById("vehicleId") as HTMLInputElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const typeInput = document.getElementById("type") as HTMLSelectElement;
const priceInput = document.getElementById("price") as HTMLInputElement;

const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
const formTitle = document.getElementById("formTitle") as HTMLElement;

/* STORAGE FUNCTIONS */

function getVehicles() {
    return JSON.parse(localStorage.getItem("vehicles") || "[]");
}
function saveVehicles(vehicles: any[]) {
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
}

/* RENDER VEHICLES */

function renderVehicles(list: any[] = getVehicles()) {
    if (!vehicleList) return;
    vehicleList.innerHTML = "";
    list.forEach((v: any) => {
        const card = document.createElement("div");
        card.className = "bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition";
        card.innerHTML = `
<h3 class="text-xl font-bold text-gray-800">${v.name}</h3><p class="text-gray-500">${v.type}</p><p class="text-blue-600 font-semibold mt-2">₹${v.price}/day</p><div class="mt-4 flex gap-2"><button
class="edit-btn bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
data-id="${v.id}">
Edit
</button><button
class="delete-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
data-id="${v.id}">
Delete
</button></div>`;
        vehicleList.appendChild(card);
    });

    /* UPDATE VEHICLE COUNT */
    if (vehicleCount) {
        vehicleCount.textContent = list.length.toString();
    }
}
/* ADD  UPDATE VEHICLE */
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = idInput.value;
    const name = nameInput.value.trim();
    const type = typeInput.value;
    const price = Number(priceInput.value);

    const vehicles = getVehicles();

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
        alert("Enter a valid vehicle name");
        return;
    }

    /* UPDATE VEHICLE */
    if (id) {
        const updatedVehicles = vehicles.map((v: any) =>
            v.id == id ? { id: Number(id), name, type, price } : v
        );

        saveVehicles(updatedVehicles);
        submitBtn.textContent = "Add Vehicle";
        formTitle.textContent = "Add Vehicle";

    }
    /* ADD VEHICLE */
    else {

        vehicles.push({
            id: Date.now(),
            name,
            type,
            price
        });
        saveVehicles(vehicles);
    }

    /* RESET FORM */

    form.reset();
    idInput.value = "";
    renderVehicles();

});
document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    let vehicles = getVehicles();
    /* DELETE VEHICLE */
    if (target.classList.contains("delete-btn")) {
        const id = Number(target.getAttribute("data-id"));
        const confirmDelete = confirm("Delete this vehicle?");
        if (!confirmDelete) return;
        vehicles = vehicles.filter((v: any) => v.id !== id);
        saveVehicles(vehicles);
        renderVehicles();
    }

    /* EDIT VEHICLE */
    if (target.classList.contains("edit-btn")) {
        const id = Number(target.getAttribute("data-id"));
        const vehicle = vehicles.find((v: any) => v.id === id);
        if (vehicle) {
            idInput.value = vehicle.id;
            nameInput.value = vehicle.name;
            typeInput.value = vehicle.type;
            priceInput.value = vehicle.price;
            submitBtn.textContent = "Update Vehicle";
            formTitle.textContent = "Update Vehicle";
        }
    }
});

/* SEARCH VEHICLES */
if (searchInput) {
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const vehicles = getVehicles();
        const filtered = vehicles.filter((v: any) =>
            v.name.toLowerCase().includes(query)
        );
        renderVehicles(filtered);
    });
    filterType.addEventListener("change", () => {
        const vehicles = getVehicles();
        const selectedType = filterType.value;
        let filtered = vehicles;
        if (selectedType !== "All") {
            filtered = vehicles.filter((v: any) => v.type === selectedType);
        }
        renderVehicles(filtered);
    });
}
renderVehicles();