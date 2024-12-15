<?php
    session_start();
    echo '<script src="modificar.js"></script>';
    echo '<script src="realizarPedido.js"></script>';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Pago</title>
    <link rel="stylesheet" href="css/pagoo.css">
</head>
<body>
<nav>
        <ul>
            <li>
               <a href="carrito.php">
                    ← Volver al Carrito
                </a>
            </li>
        </ul>
    </nav>
    <main>
        <h1>Formulario de Envio</h1>
        <form id="payment-form">
            <div class="form-section">
                <div class="form-group">
                    <label  id="titu "for="full-name">Nombre Completo</label>
                    <input type="text" id="full-name" name="full-name" required>
                </div>
                <div class="form-group">
                    <label for="address">Dirección</label>
                    <input type="text" id="address" name="address" required>
                </div>
                <div class="form-group">
                    <label for="city">Ciudad</label>
                    <input type="text" id="city" name="city" required>
                </div>
                <div class="form-group">
                    <label for="state">Provincia/Estado</label>
                    <input type="text" id="state" name="state" required>
                </div>
                <div class="form-group">
                    <label for="reference">Referencias del lugar</label>
                    <input type="text" id="reference" name="reference">
                </div>
                <div class="form-group">
                    <label for="zip">Código Postal</label>
                    <input type="text" id="zip" name="zip" required>
                </div>
                <div class="form-group">
                    <label for="phone">Teléfono</label>
                    <input type="text" id="phone" name="phone" required>
                </div>
                <div class="form-group">
                    <label for="email">correo</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <input type="hidden" id="usuario" name="usuario" value=<?php echo $_SESSION['username'];?>>
            </div>
            <button type="submit">Realizar pedido</button>
        </form>
    </main>
</body>
</html>
