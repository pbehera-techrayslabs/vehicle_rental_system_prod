export function showToast(message: string, type: string = "success") {

const container = document.getElementById("toast-box");

if (!container) return;

const toast = document.createElement("div");

let color = "bg-green-600";

if (type === "error") color = "bg-red-600";
if (type === "info") color = "bg-blue-600";

toast.className = `${color} text-white px-4 py-2 rounded shadow animate-slide-in`;

toast.textContent = message;

container.appendChild(toast);

setTimeout(() => {
    toast.remove();
}, 1000);

}