export function renderFooter() {

    const footer = document.getElementById("footer");

    if (!footer) return;

    footer.innerHTML = `

<footer class="bg-gray-800 text-white text-center p-6">

<p>© 2026  Travels. All rights reserved.</p>

</footer>

`;

}