<?php
    echo '<script src="modificar.js"></script>';
    echo "<script>
    function verificarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || {};
        if (Object.keys(carrito).length === 0) {
            alert('El carrito está vacío. Agrega productos antes de realizar el pedido.');
            return false; // Bloquea el envío del formulario
        }
        return true; // Permite el envío del formulario si hay productos en el carrito
    }
    document.getElementById('realizarPedido').addEventListener('click', (event) => {
        if (!verificarCarrito()) {
            event.preventDefault(); // Evita que se realice la acción si el carrito está vacío
        }
    });
</script>";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrito</title>
    <link rel="stylesheet" href="css/carritoo.css">
   
</head>
<body>
    <nav>
        <ul>
            <li>
               <a href="index.php">
                    ← Volver a Comprar
                </a>
            </li>
            <li>
                 <a href="#">
                    <span class="icon">🛒</span>
                    Carrito
                </a>
            </li>
        </ul>
    </nav>
    <main>
        <h1>Bienvenido al Carrito</h1>
        <p>Aquí puedes gestionar los artículos de tu carrito.</p>
        <div class="cart-products">
            <span class="cart-products-title">Productos en el carrito</span>
        </div>
        <div>
           
            <a href="realizarPedido.php">
                <button id="realizarPedido">Realizar pedido</button>
            </a>
        </div>
    </main>
    <script src="modificar.js"></script>
</body>
</html>
