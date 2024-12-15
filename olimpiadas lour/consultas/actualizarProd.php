<?php

        require("conexion.php");
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $id = $data['id'];
        $nombre = $data['nombre'];
        $precio = $data['precio'];

        $stmt = $con->prepare("UPDATE productos SET Nombre = ?, precio = ? WHERE id = ?");
        $stmt->bind_param("sdi", $nombre, $precio, $id);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false]);
        }

        $stmt->close();
        $con->close();

?>
