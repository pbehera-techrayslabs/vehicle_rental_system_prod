const session = JSON.parse(localStorage.getItem("session") || "null");
if (!session || session.role !== "admin") {
    alert("Access denied");
    window.location.href = "/frontend/index.html";
}

const table = document.getElementById("user-table");
const userCount = document.getElementById("userCount");
const searchInput = document.getElementById("searchUser") as HTMLInputElement;

let users = JSON.parse(localStorage.getItem("users") || "[]");

function renderUsers(list: any[] = users) {
    if (!table) return;
    table.innerHTML = "";
    list.forEach((user: any) => {
        const row = document.createElement("tr");
        row.className = "border-b hover:bg-gray-50";
        row.innerHTML = `
<td class="p-3 text-center">${user.name}</td><td class="p-3 text-center">${user.email}</td><td class="p-3 text-center"><button
class="delete-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
data-id="${user.id}">
Delete
</button></td>`;
        table.appendChild(row);
    });
    if (userCount) {
        userCount.textContent = list.length.toString();
    }

}

document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("delete-btn")) {
        const id = Number(target.getAttribute("data-id"));
        const confirmDelete = confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        users = users.filter((u: any) => u.id !== id);
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
    }
});

/* SEARCH USER */

if (searchInput) {

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = users.filter((u: any) =>
            u.name.toLowerCase().includes(query) ||
            u.email.toLowerCase().includes(query)
        );

        renderUsers(filtered);

    });

}

renderUsers();