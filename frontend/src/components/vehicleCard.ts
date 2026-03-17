interface Vehicle {

    name: string
    price: number
    image: string
    quantity: number

}

export function vehicleCard(vehicle: Vehicle) {

    return `

<div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition duration-300"><img src="${vehicle.image}"
alt="${vehicle.name}"
class="w-full h-48 object-cover">

<div class="p-5"><h3 class="text-xl font-bold text-gray-800">
${vehicle.name}
</h3><p class="text-gray-500 mt-2 text-lg">
₹${vehicle.price} <span class="text-sm">/ day</span>
</p><p class="text-sm text-green-600">
Available Units: ${vehicle.quantity}
</p><button
class="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">

🚗 Book Now

</button></div></div>`;

}