<?php
    session_start();
    if ($_SESSION['loggedin'] === true && $_SESSION['rol']>=1) {
        require("conexion.php");
        if($_SESSION['rol'] == 1){
            $data = file_get_contents("php://input");
            $decodedData = json_decode($data, true);
            if (isset($decodedData['id'])) {
                $id = $decodedData['id'];
                $stmt = $con->prepare("DELETE FROM pedidos WHERE codigo = ?");
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
        else if($_SESSION['rol'] == 2){
            $data = file_get_contents("php://input");
            $decodedData = json_decode($data, true);

            if (isset($decodedData['id'])) {
                $id = $decodedData['id'];
                $stmtSelect = $con->prepare("SELECT * FROM pedidos WHERE codigo = ?");
                $stmtSelect->bind_param("i", $id);
                $stmtSelect->execute();
                $result = $stmtSelect->get_result();
            
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
            
                    // Insertar el registro en la tabla histórica
                    $stmtInsert = $con->prepare("INSERT INTO historial_pedidos (codigo, fecha_pedido, nombre, pedido, direccion, referencias, telefono, correo, estado, montoTotal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                    $stmtInsert->bind_param("issssssssi", 
                        $row['codigo'], 
                        $row['fecha_pedido'], 
                        $row['nombre'], 
                        $row['pedido'], 
                        $row['direccion'], 
                        $row['referencias'], 
                        $row['telefono'], 
                        $row['correo'], 
                        $row['estado'], 
                        $row['montoTotal']
                    );
            
                    if ($stmtInsert->execute()) {
                        $stmtDelete = $con->prepare("DELETE FROM pedidos WHERE codigo = ?");
                        $stmtDelete->bind_param("i", $id);
                        if ($stmtDelete->execute()) {
                            echo json_encode(['success' => true]);
                        } else {
                            echo json_encode(['success' => false, 'error' => $stmtDelete->error]);
                        }
                        $stmtDelete->close();
                    } else {
                        echo json_encode(['success' => false, 'error' => $stmtInsert->error]);
                    }
            
                    $stmtInsert->close();
                } else {
                    echo json_encode(['success' => false, 'error' => 'Registro no encontrado']);
                }
            }
        }
        mysqli_close($con);
    }
    else{
        header("Location: index.php");
        exit;
    }
?>