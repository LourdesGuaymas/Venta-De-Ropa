<?php
session_start();
echo "<script src= '../vaciarCarrito.js'></script>";
// Verificar si ya está logueado
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    header("Location: index.php"); // Redirigir si ya está logueado
    exit;
}

// Este codigo verifica si es el metodo de 'registro' o 'login', ya que en base a eso se hace la peticion
// para crear un resultado nuevo si es registro o para traer de la base de datos si existe el usuario.
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['login'])) {
    $input_username = $_POST['username'];
    $input_password = $_POST['password'];
    require("../consultas/conexion.php");
    $consulta="SELECT * from usuarios where usuario='$input_username'";
    $resultado=mysqli_query($con,$consulta);
    if($resultado){
        $fila=mysqli_fetch_array($resultado);
        $usuario = $fila['usuario'];
        $contrasena = $fila['contrasena'];
    }
    if($input_password == $contrasena && $input_username == $usuario){
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $usuario;
        $_SESSION['rol'] = $fila['rol'];
        header("Location: ../index.php");
        exit;
    }
    else{
        echo "<script>alert('Usuario o contraseña incorrectos');</script>";
        
    }
    mysqli_close($con);
}
if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['Registro'])){
    $contrasena = $_POST['contra'];
    $nombre = $_POST['nombre'];
    $rol = 1;
    require("../consultas/conexion.php");
    $consulta = "SELECT * FROM usuarios WHERE usuario = '$nombre'";
    $resultado = mysqli_query($con, $consulta);

    if (mysqli_num_rows($resultado) > 0) {
        echo "<script>alert('El nombre de usuario ya está en uso. Por favor elige otro');</script>";
    } else {
        // Insertar el nuevo usuario
        $consulta = "INSERT INTO usuarios (usuario, contrasena, rol) VALUES ('$nombre', '$contrasena', '$rol')";
        $resultado = mysqli_query($con, $consulta);

        if ($resultado) {
            echo "Registro completado con éxito.<br>";
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $nombre;
            $_SESSION['rol'] = 1;
            header("Location: ../index.php");
            exit;
        } else {
            echo "<script>alert('Error al registrar el usuario.');</script>";
        }
    }

    mysqli_close($con);
}
echo '<script src="../scripts/login.js"></script>';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login y Registro</title>
    <link rel="stylesheet" href="../css/loginn.css">
</head>
<body> 
<div class="caja">
        <div class="cajaboton">
            <button id="Login">Login</button>
            <button id="Registro">Registro</button>
        </div>
        <div id="principal">
        </div>
    </div>
</body>
</html>
