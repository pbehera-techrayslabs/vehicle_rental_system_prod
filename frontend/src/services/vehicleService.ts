const VEHICLES_KEY = "vehicles";

/* GET VEHICLES */

export function getVehicles() {
    return JSON.parse(localStorage.getItem(VEHICLES_KEY) || "[]");
}

/* SAVE VEHICLES */

export function saveVehicles(vehicles: any[]) {
    localStorage.setItem(VEHICLES_KEY, JSON.stringify(vehicles));
}

/* ADD VEHICLE */

export function addVehicle(vehicle: any) {

    const vehicles = getVehicles();

    vehicles.push(vehicle);

    saveVehicles(vehicles);

}

/* DELETE VEHICLE */

export function deleteVehicle(id: number) {

    let vehicles = getVehicles();

    vehicles = vehicles.filter((v: any) => v.id !== id);

    saveVehicles(vehicles);

}

/* UPDATE VEHICLE */

export function updateVehicle(updatedVehicle: any) {

    let vehicles = getVehicles();

    vehicles = vehicles.map((v: any) =>

        v.id === updatedVehicle.id ? updatedVehicle : v

    );

    saveVehicles(vehicles);

}

/* GET VEHICLE BY ID */

export function getVehicleById(id: number) {

    const vehicles = getVehicles();

    return vehicles.find((v: any) => v.id === id);

}