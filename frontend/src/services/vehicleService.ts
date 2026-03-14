const VEHICLES_KEY = "vehicles";

export function getVehicles() {
    return JSON.parse(localStorage.getItem(VEHICLES_KEY) || "[]");
}
export function saveVehicles(vehicles: any[]) {
    localStorage.setItem(VEHICLES_KEY, JSON.stringify(vehicles));
}
export function addVehicle(vehicle: any) {
    const vehicles = getVehicles();
    vehicles.push(vehicle);
    saveVehicles(vehicles);
}
export function deleteVehicle(id: number) {
    let vehicles = getVehicles();
    vehicles = vehicles.filter((v: any) => v.id !== id);
    saveVehicles(vehicles);
}
export function updateVehicle(updatedVehicle: any) {
    let vehicles = getVehicles();
    vehicles = vehicles.map((v: any) =>
        v.id === updatedVehicle.id ? updatedVehicle : v
    );
    saveVehicles(vehicles);
}
export function getVehicleById(id: number) {
    const vehicles = getVehicles();
    return vehicles.find((v: any) => v.id === id);
}