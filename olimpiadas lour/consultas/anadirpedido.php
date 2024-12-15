<?php
    header('Content-Type: application/json'); 
    session_start();
    if($_SESSION['rol']>=1){
        require("conexion.php");
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            echo json_encode(['error' => 'Error al decodificar JSON: ' . json_last_error_msg()]);
            exit;
        }

        $stmt = $con->prepare("INSERT INTO pedidos (`fecha_pedido`, `nombre`, `pedido`, `direccion`, `telefono`, `correo`, `estado`, `montoTotal`, `pago`, `referencias`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $conjunto = $data['state'] . ', ' . $data['city'] . ', ' . $data['address'] . ', ' . $data['zip'];
        $estado = "no entregado";
        $stmt->bind_param("ssssssssss", $data['fechaPedido'], $data['name'], $data['pedido'], $conjunto, $data['phone'], $data['email'], $estado, $data['precio'], 'no', $data['reference']);
        if ($stmt->execute()) {
            echo json_encode(["message" => "Pedido cargado exitosamente"]);
        } else {
            echo json_encode(["error" => "Error: " . $stmt->error]);
        }
        
        $stmt->close();
        $con->close();
        
    }
?>