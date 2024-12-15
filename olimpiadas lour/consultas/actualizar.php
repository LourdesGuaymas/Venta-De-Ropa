<?php
    session_start();
    
    if ($_SESSION['loggedin'] === true && $_SESSION['rol']>=1) {
        require("conexion.php");
        
        
        if($_SESSION['rol'] == 1){
            $nombre = $_SESSION['username'];
            $data = file_get_contents("php://input");
            $decodedData = json_decode($data, true);
            if (isset($decodedData['a']) && isset($decodedData['b']) && isset($decodedData['c']) && isset($decodedData['d']) && isset($decodedData['id'])){
                $a = $decodedData['a'];
                $b = $decodedData['b'];
                $c = $decodedData['c'];
                $d = $decodedData['d'];
                $id = $decodedData['id'];
                $stmt = $con->prepare("UPDATE pedidos SET direccion = ?, referencias = ?, telefono = ?, correo = ?  WHERE codigo = ?");
                $stmt->bind_param("ssssi", $a, $b, $c, $d, $id);
            
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
        else{
            
        }
        mysqli_close($con);
    }
    else{
        header("Location: index.php");
        exit;
    }
?>