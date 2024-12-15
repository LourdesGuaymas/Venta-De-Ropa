<?php
    require("consultas/conexion.php");
    header("Content-Type: application/json; charset=UTF-8");
    $result = $con->query("SELECT * FROM productos");
    $productos = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $productos[] = $row;
        }
    }
    mysqli_close($con);
    echo json_encode($productos);
?>