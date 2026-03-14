export function renderNavbar() {

const navbar = document.getElementById("navbar");

if (!navbar) return;

navbar.innerHTML = `

<header class="bg-linear-to-r from-blue-700 to-blue-500 shadow-lg sticky top-0 z-50"><div class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 text-white"><!-- Logo + Title --><div class="flex items-center space-x-3"><span class="text-3xl">🚗</span>

<h1 class="text-2xl font-bold tracking-wide">
Vehicle Rental System
</h1></div><!-- Navigation Links --><nav class="flex items-center space-x-6 text-lg"><a href="/frontend/index.html"
class="hover:text-yellow-300 transition duration-300">
Home
</a>

<a href="/frontend/src/pages/vehicles.html"
class="hover:text-yellow-300 transition duration-300">
Vehicles
</a>

<!-- Login Button --><a href="/frontend/src/pages/login.html"
class="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 hover:text-black transition duration-300">
Login
</a>

<!-- Register Button --><a href="/frontend/src/pages/register.html"
class="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition duration-300">
Register
</a>

</nav></div></header>`;

}