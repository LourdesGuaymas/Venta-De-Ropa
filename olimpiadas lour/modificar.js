function pagar(){
    alert("una vez realizado el pago no se puede editar el pedido");
}
function eliminarP(parm){
    fetch('consultas/eliminarProd.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: parm
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Producto eliminado de manera exitosa");
            location.reload();
        } else {
            alert('Error al guardar los cambios.');
        }
    })
    .catch(error => console.error('Error:', error));
}

//aca deberia modificar esto para que te lleve a una nueva pagina y en esa te permita editar   
function guardarCambios(fila, parm) {
    const nuevaDireccion = fila.querySelector('.input-direccion').value;
    const nuevaReferencia = fila.querySelector('.input-referencias').value;
    const nuevoTelefono = fila.querySelector('.input-telefono').value;
    const nuevoCorreo = fila.querySelector('.input-correo').value;
    fetch('consultas/actualizar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            a: nuevaDireccion,
            b: nuevaReferencia,
            c: nuevoTelefono,
            d: nuevoCorreo,
            id: parm
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        } else {
            alert('Error al guardar los cambios.');
        }
    })
    .catch(error => console.error('Error:', error));
}
function enviar() {
    const price = document.getElementById('precio').value;
    const name = document.getElementById('nombre').value;
    const data = {
        precio: price,
        nombre: name
    };
    fetch('consultas/insertar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
};
function entregado(parm){
    fetch('consultas/eliminar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: parm
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("pedido entregado de manera exitosa");
            location.reload();
        } else {
            alert('Error al guardar los cambios.');
        }
    })
    .catch(error => console.error('Error:', error));
}

function eliminarProducto(parm){
    fetch('consultas/eliminar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: parm
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("pedido entregado de manera exitosa");
            location.reload();
        } else {
            alert('Error al guardar los cambios.');
        }
    })
    .catch(error => console.error('Error:', error));
}

var carrito = JSON.parse(localStorage.getItem('carrito')) || {};
let cantidadTotal = 0;
let total = 0;

function anadirCarrito_menuindex(id, precio, nombre) {
    if (!carrito[id]) {
        carrito[id] = { nombre: nombre, precio: precio, cantidad: 0 };
    }
    carrito[id].cantidad += 1;

    cantidadTotal = 0;
    total = 0;
    for (let clave in carrito) {
        let item = carrito[clave];
        if (item.precio !== undefined && item.cantidad !== undefined) {
            total += item.precio * item.cantidad;
            cantidadTotal += item.cantidad;
        }
    }

    document.getElementById('cant').innerText = cantidadTotal;
    document.getElementById('total').innerText = total.toFixed(2);

    localStorage.setItem('carrito', JSON.stringify(carrito));
    logicaCarrito(carrito);
}

function logicaCarrito(a) {
    let carritoHtml = '';
    for (let id in a) {
        let item = a[id];
        carritoHtml += `
            <li>
                Producto: ${item.nombre} <br>
                Precio: $${item.precio} <br>
                Cantidad: ${item.cantidad}
            </li>
        `;
    }
    document.querySelector('.cart-products').innerHTML = `
        <span class="cart-products-title">Productos en el carrito</span>
        <ul>${carritoHtml}</ul>
    `;
}

function actualizarVistaCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || {};
    let cantidadTotal = 0;
    let total = 0;

    let carritoHtml = '';
    for (let id in carrito) {
        let item = carrito[id];
        carritoHtml += `
            <li>
               <p> Producto: ${item.nombre} <br></p>
                <p>  Precio: $${item.precio} </p><br>
                 <p> Cantidad: </p>
                <button class="btn-restar" data-id="${id}">-</button>
                <input type="number" min="1" value="${item.cantidad}" data-id="${id}" class="input-cantidad">
                <button class="btn-sumar" data-id="${id}">+</button><br>
                <button onclick="eliminarDelCarrito('${id}')">Eliminar</button>
            </li>
            <style>
            p{ font-weight: bold;}

           
            </style>
        `;
        total += item.precio * item.cantidad;
        cantidadTotal += item.cantidad;
    }
    document.querySelector('.cart-products').innerHTML = `
        <span class="cart-products-title">Productos en el carrito</span>
        <ul>${carritoHtml}</ul>
        <p>Total productos: <span id="cant">${cantidadTotal}</span></p>
        <p>Total: $<span id="total">${total.toFixed(2)}</span></p>
    `;

    document.querySelectorAll('.btn-restar').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemId = event.target.getAttribute('data-id');
            cambiarCantidad(itemId, -1, carrito);
        });
    });

    document.querySelectorAll('.btn-sumar').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemId = event.target.getAttribute('data-id');
            cambiarCantidad(itemId, 1, carrito);
        });
    });

    document.querySelectorAll('.input-cantidad').forEach(input => {
        input.addEventListener('input', (event) => {
            const itemId = event.target.getAttribute('data-id');
            const nuevaCantidad = parseInt(event.target.value, 10);
            if (nuevaCantidad > 0) {
                actualizarCantidad(itemId, nuevaCantidad, carrito);
            } else {
                alert("La cantidad debe ser mayor a 0");
                event.target.value = carrito[itemId].cantidad;
            }
        });
    });
}

function anadirCarrito(id, precio, nombre) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || {};
    
    if (!carrito[id]) {
        carrito[id] = { nombre: nombre, precio: precio, cantidad: 0 };
    }
    carrito[id].cantidad += 1;

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarVistaCarrito();
}

function actualizarCantidad(id, nuevaCantidad, carrito) {
    if (carrito[id] && nuevaCantidad > 0) {
        carrito[id].cantidad = nuevaCantidad;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarVistaCarrito();
    }
}

function cambiarCantidad(id, valor, carrito) {
    if (carrito[id]) {
        carrito[id].cantidad = Math.max(1, carrito[id].cantidad + valor);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarVistaCarrito();
    }
}

function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

    if (carrito[id]) {
        delete carrito[id];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarVistaCarrito();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarVistaCarrito();
});