<?php 
    session_start();
    if (!isset($_SESSION['loggedin'])) {
        $_SESSION['loggedin'] = false;
        $_SESSION['username'] = 'invitado';
        $_SESSION['rol'] = 0;
    }
    echo '<script src="nav.js"></script>';
    echo '<script src="modificar.js"></script>';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index</title>
   <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h2>Bienvenido, <?php echo $_SESSION['username'];?></h2>
        <?php if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true): ?>
            <a href="login/logout.php"><button>Log-Out</button></a>
        <?php else: ?>
            <a href="login/login.php"><button id="excepcion">Log-In</button></a>
        <?php endif; ?>
        <?php if($_SESSION['loggedin'] && $_SESSION['rol'] >=1){ ?>

            <a href="carrito.php" class="carrito-link">
                <div class="carrito">    
                    <div class="carrito-info">
                          <img src="carrito-de-compras.png" alt=""> <span id="cant">0</span><br>
                          <style> </style> 
                       <br> Total: $<span id="total"></span>
                    </div>
                </div>
            </a>
        <?php } ?>
    </header>
    
    <nav>
      <ul> <li class="tab" data-content="Productos">Productos</li>
        
           
     
            <?php if (!$_SESSION['loggedin']): ?>
                <script>
                    document.addEventListener('click', function(e) {
                        if (e.target.tagName === 'BUTTON') {
                            if (e.target.id !== 'excepcion') {
                                alert('No puedes añadir productos como invitado');
                            }
                        }
                    });
                </script>
            <?php else: ?>
                <?php if ($_SESSION['rol'] == 1): ?>
                    <li class="tab" data-content="PedPendientes">Pedidos pendientes</li>
                <?php endif; ?>
                <?php if ($_SESSION['rol'] == 2): ?>
                    <li class="tab" data-content="CargarProd">Cargar productos</li>
                    <li class="tab" data-content="EditarProd">Editar productos</li>
                    <li class="tab" data-content="PedPenVentas">Pedidos pendientes de personas</li>
                    <li class="tab" data-content="HistorialPedidos">Historial de pedidos</li>
                <?php endif; ?>
            <?php endif; ?>
        </ul>
    </nav>

    <div id="main">
        <!-- Your main content goes here -->
    </div>
    
    <script>
        document.querySelectorAll('tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                document.querySelectorAll('tab').forEach(function(tab) {
                    tab.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    </script>
    <footer id="footer">        <p>Footer Content Goes Here</p>
    </footer>
    <script>// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('footer');

    window.addEventListener('scroll', () => {
        // Verifica si el usuario está cerca del final de la página
        const scrollPosition = window.innerHeight + window.scrollY;
        const documentHeight = document.documentElement.offsetHeight;

        // Si el usuario está cerca del final, muestra el footer
        if (scrollPosition >= documentHeight - 100) { // Ajusta el valor de 100 según sea necesario
            footer.style.display = 'block';
        } else {
            footer.style.display = 'none';
        }
    });
});
</script>

</body>
</html>
