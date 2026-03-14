interface Vehicle {

name: string
price: number
image: string

}

export function vehicleCard(vehicle: Vehicle) {

return `

<div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition duration-300"><!-- Vehicle Image --><img src="${vehicle.image}" alt="${vehicle.name}"
class="w-full h-48 object-cover">

<div class="p-5"><!-- Vehicle Name --><h3 class="text-xl font-bold text-gray-800">
${vehicle.name}
</h3><!-- Price --><p class="text-gray-500 mt-2 text-lg">
₹${vehicle.price} <span class="text-sm">/ day</span>
</p><!-- Button --><button
class="mt-4 w-full bg-linear-to-r from-blue-600 to-blue-500 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition duration-300">

🚗 Book Now

</button></div></div>`;

}