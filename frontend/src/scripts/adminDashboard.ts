declare const Swal: any;
const session = JSON.parse(localStorage.getItem("session") || "null");

if (!session || session.role !== "admin") {
    alert("Access denied");
    window.location.href = "index.html";
}
function getVehicles() {
    return JSON.parse(localStorage.getItem("vehicles") || "[]");
}
function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

function getBookings() {
    return JSON.parse(localStorage.getItem("bookings") || "[]");
}
function loadStats() {
    const vehicles = getVehicles();
    const users = getUsers();
    const bookings = getBookings();
    const today = new Date().toISOString().split("T")[0];
    const pendingBookings = bookings.filter((b: any) => b.status === "Pending");
    const bookedBookings = bookings.filter((b: any) => b.status === "Booked");
    const totalActiveBookings = pendingBookings.length + bookedBookings.length;
    const todayBookings = bookings.filter((b: any) =>
        b.date === today && (b.status === "Pending" || b.status === "Booked")
    );
    (document.getElementById("totalVehicles") as HTMLElement).textContent =
        vehicles.length.toString();
    (document.getElementById("totalUsers") as HTMLElement).textContent =
        users.length.toString();
    (document.getElementById("totalBookings") as HTMLElement).textContent =
        totalActiveBookings.toString();
    (document.getElementById("todayBookings") as HTMLElement).textContent =
        todayBookings.length.toString();
    (document.getElementById("pendingBookings") as HTMLElement).textContent =
        pendingBookings.length.toString();
    (document.getElementById("bookedBookings") as HTMLElement).textContent =
        bookedBookings.length.toString();
    const revenue=calculateRevenue();
    (document.getElementById("totalRevenue") as HTMLElement).textContent=
    "₹"+revenue;

}
function calculateRevenue(){
    const vehicles = getVehicles();
    const bookings= getBookings();
    let revenue=0;
    bookings.forEach((b:any)=>{
        if(b.status!=="Booked")
            return;
        const vehicle= vehicles.find((v:any)=>v.id===b.vehicleId);
        if(!vehicle)
            return;
        const start= new Date(b.startDate);
        const end= new Date(b.endDate);
        const diff=end.getTime()-start.getTime();
        const days=Math.ceil(diff/(1000*60*60*24))+1;
        revenue+=days*vehicle.price;
    });
    return revenue;
}
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn?.addEventListener("click", () => {
    Swal.fire({
        title: "Logout?",
        text: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonCancel: "#d33",
        confirmButtonText: "Yes, Logout."
    }).then((result: any) => {
        if (result.isConfirmed) {
            localStorage.removeItem("session");
            document.cookie = "auth=false";
            window.location.href = "login.html";
        }
    })

});
loadStats();