<?php
session_start();
session_unset();    // Eliminar todas las variables de sesión
session_destroy();  // Destruir la sesión
// Reiniciar la sesión como invitado
session_start();
$_SESSION['loggedin'] = false;
$_SESSION['username'] = 'invitado';
$_SESSION['rol'] = 'guest';

header("Location: ../index.php"); // Redirigir a la página principal después de logout
exit;
?>
