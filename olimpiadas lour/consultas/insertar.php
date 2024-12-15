<?php
    require("conexion.php");
    session_start();
    if($_SESSION['rol'] == 2){
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $stmt = $con->prepare("INSERT INTO productos (precio, Nombre) VALUES (?, ?)");
        $stmt->bind_param("ss", $data['precio'], $data['nombre']);

        if ($stmt->execute()) {
            echo "Producto guardado exitosamente.";
        } else {
            echo "Error: " . $stmt->error;
        } 
        $stmt->close();
        $con->close();
    }
    
?>
