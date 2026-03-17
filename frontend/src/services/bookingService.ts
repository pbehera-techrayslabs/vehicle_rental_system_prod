export function isVehicleBooked(vehicleId: number, startDate: string, endDate: string) {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    const vehicles = JSON.parse(localStorage.getItem("vehicles") || "[]")
    const vehicle = vehicles.find((v: any) => v.id === vehicleId)
    if (!vehicle) return true
    const newStart = new Date(startDate)
    const newEnd = new Date(endDate)
    const overlapping = bookings.filter((b: any) => {
        if (b.vehicleId !== vehicleId) return false
        if (b.status === "Cancelled") return false
        const existingStart = new Date(b.startDate)
        const existingEnd = new Date(b.endDate)
        return newStart <= existingEnd && newEnd >= existingStart
    })
    return overlapping.length >= vehicle.quantity
}
export function getVehicleBookedDates(vehicleId: number) {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    return bookings.filter((b: any) =>
        b.vehicleId === vehicleId &&
        b.status !== "Cancelled"
    )
}