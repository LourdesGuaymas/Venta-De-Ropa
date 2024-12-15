<?php
    session_start();
    require("consultas/conexion.php");
    if($_SESSION['rol']==2){
        //codigo para toda la tabla de pedidos pendientes del de ventas
        header("Content-Type: application/json; charset=UTF-8");
        $result = $con->query("SELECT * FROM pedidos");
        $pedido = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $pedido[] = $row;
            }
        }
    }
    else if($_SESSION['rol']==1){
        //codigo para la tabla solo de lo que tiene asignado el usuario
        $name = $_SESSION['username'];
        header("Content-Type: application/json; charset=UTF-8");
        $result = $con->query("SELECT * FROM pedidos WHERE nombre = '$name'");
        $pedido = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $pedido[] = $row;
            }
        }
    }
    else{
        header("Location: index.php");
        exit;
    }
    mysqli_close($con);
    echo json_encode($pedido);
?>