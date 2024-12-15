function vaciarCarrito() {
    localStorage.removeItem('carrito');
}
document.addEventListener('DOMContentLoaded', () => {
    vaciarCarrito();
});