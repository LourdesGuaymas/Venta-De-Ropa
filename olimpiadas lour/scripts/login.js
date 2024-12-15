document.addEventListener('DOMContentLoaded', function(e) {
    const registro = document.getElementById('Registro');
    const login = document.getElementById('Login')
    const menuContainer = document.getElementById('principal');
    let currentMenu = 'Login';

    function showMenuLogin(){
        menuContainer.innerHTML=` 

          <link rel="stylesheet" href="../css/loginn.css">
            <h2>Iniciar Sesión</h2>
            <form action="login.php" method="post">
                <label for="username">Nombre de usuario:</label><br>
                <input type="text" id="nombre" name="username" required><br><br>
                <label for="password">Contraseña:</label><br>
                <input type="password" id="password" name="password" required><br><br>
                <input type="submit" name="login" value="Iniciar sesión">
            </form>
            <style> 
             

            </style>`;
        currentMenu = 'Login';
    }
    function showMenuRegistro(){
        menuContainer.innerHTML=`
                  <link rel="stylesheet" href="../css/loginn.css">
            <h2>Registro</h2>
            <form action="login.php" method="post">
                <label for="username">Nombre de usuario:</label><br>
                <input type="text" id="username" name="nombre" required><br><br>
                <label for="password">Contraseña:</label><br>
                <input type="password" id="password" name="contra" required><br><br>
                <input type="submit" name="Registro" value="Registro">
            </form>
            <style> 
                
            </style>`;
        currentMenu = 'Registro';
    }
    registro.addEventListener('click', function() {
        if (currentMenu !== 'Registro') {
            showMenuRegistro();
        } 
    });

    login.addEventListener('click', function() {
        if (currentMenu !== 'Login') {
            showMenuLogin();
        } 
    });
    showMenuLogin();
})
document.getElementById("username").addEventListener("input", function() {
    const username = this.value;
    fetch('../consultas/comprobarN.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username })
    })
    .then(response => response.json())
    .then(data => {
        if (data.exists) {
            document.getElementById("usernameError").innerText = "El nombre de usuario ya está en uso.";
        } else {
            document.getElementById("usernameError").innerText = "";
        }
    });
});