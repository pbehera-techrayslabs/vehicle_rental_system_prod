export function renderNavbar(){

const navbar = document.getElementById("navbar");

if(!navbar) return;

navbar.innerHTML = `

<header class="bg-blue-600 shadow-md">

<div class="max-w-7xl mx-auto flex justify-between items-center p-4 text-white">

<h1 class="text-2xl font-bold">Vehicle rental system</h1>

<nav class="space-x-6">

<a href="/frontend/index.html" class="hover:text-yellow-300">Home</a>
<a href="/frontend/src/pages/vehicles.html" class="hover:text-yellow-300">Vehicles</a>
<a href="/frontend/src/pages/login.html" class="hover:text-yellow-300">Login</a>
<a href="/frontend/src/pages/register.html" class="hover:text-yellow-300">Register</a>

</nav>

</div>

</header>

`;

}