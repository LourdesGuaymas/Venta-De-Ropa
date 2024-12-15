<?php
    session_start();
    if($_SESSION['rol'] == 2){
        require("conexion.php");
        $data = file_get_contents("php://input");
        $decodedData = json_decode($data, true);
        if (isset($decodedData['id'])) {
            $id = $decodedData['id'];
            $stmt = $con->prepare("DELETE FROM productos WHERE id = ?");
            $stmt->bind_param("i", $id);
            if ($stmt->execute()) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => $stmt->error]);
            }
            $stmt->close();
        } else {
            echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
        }
    }
?>