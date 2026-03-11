interface Vehicle{

name:string
price:number
image:string

}

export function vehicleCard(vehicle:Vehicle){

return `

<div class="bg-white rounded-lg shadow-lg overflow-hidden p-6">


<div class="p-5">

<h3 class="text-xl font-semibold">${vehicle.name}</h3>

<p class="text-gray-500 mt-2">₹${vehicle.price} / day</p>

<button
class="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">

Book Now

</button>

</div>

</div>

`;

}