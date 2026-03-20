export function isVehicleBooked(vehicleId: number, startDate: string, endDate: string) {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    const vehicles = JSON.parse(localStorage.getItem("vehicles") || "[]")
    const vehicle = vehicles.find((v: any) => v.id === vehicleId)
    if (!vehicle) return true
    const newStart = new Date(startDate)
    const newEnd = new Date(endDate)
    for (let d= new Date(newStart); d<= newEnd; d.setDate(d.getDate()+1)){
        const currentDate= d.toISOString().split("T")[0];
        const count = bookings.filter((b:any)=>{
            if (b.vehicleId !== vehicleId) return false;
            if (b.status === "Cancelled") return false;

            const existingStart= new Date(b.startDate);
            const existingEnd= new Date(b.endDate);

            return d>= existingStart && d<= existingEnd;
        }).length;
        if (count>= vehicle.quantity){
            return true;
        }
    }
    return false;
}
export function getVehicleBookedDates(vehicleId: number) {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    return bookings.filter((b: any) =>
        b.vehicleId === vehicleId &&
        b.status !== "Cancelled"
    )
}