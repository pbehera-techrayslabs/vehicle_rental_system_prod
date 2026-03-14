const BOOKINGS_KEY = "bookings";
export function getBookings() {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
}
export function saveBookings(bookings: any[]) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}
export function addBooking(booking: any) {
    const bookings = getBookings();
    bookings.push(booking);
    saveBookings(bookings);
}
export function getUserBookings(email: string) {
    const bookings = getBookings();
    return bookings.filter((b: any) => b.userEmail === email);
}
export function deleteBooking(id: number) {
    let bookings = getBookings();
    bookings = bookings.filter((b: any) => b.id !== id);
    saveBookings(bookings);
}