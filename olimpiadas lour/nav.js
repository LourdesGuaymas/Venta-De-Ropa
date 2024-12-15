var prod = [], ped = [];
async function productos() {
    try {
        const response = await fetch("solicitar.php");
        const data = await response.json();
        data.forEach(producto => {
            prod.push({ id: producto.id, nombre: producto.Nombre, precio: producto.precio });
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
async function mostrarProductos(parm) {
    await productos();
    var html
    if(parm == 'Productos'){
        html = prod.map(producto => `
            <div class="product-item">
                <h2>${producto.nombre}</h2>
                <p>Precio: $${producto.precio}</p>
                <button id="a" onclick="anadirCarrito_menuindex(${producto.id},${producto.precio}, '${producto.nombre}')">añadir al carrito</button>
            </div>
        `).join('');
    }
    else if(parm == 'EditarProd'){
        const uniqueProducts = [];
        const seenIds = new Set();
    
        prod.forEach(producto => {
            if (!seenIds.has(producto.id)) {
                uniqueProducts.push(producto);
                seenIds.add(producto.id);
            }
        });
    
        // Generar el HTML solo con los productos únicos
        html = uniqueProducts.map(producto => `
            <div class="product-item ${producto.id}">
                <h2>${producto.nombre}</h2>
                <p>ID: ${producto.id}</p>
                <p>Precio: $${producto.precio}</p>
                <button onclick="editarP(${producto.id})">Editar</button>
                <button onclick="eliminarP(${producto.id})">Eliminar</button>
                <div id="edit-form-${producto.id}" class="edit-form" style="display:none;">
                    <label for="edit-nombre-${producto.id}">Nombre</label><br>
                    <input id="edit-nombre-${producto.id}" type="text" value="${producto.nombre}"><br><br>
                    <label for="edit-precio-${producto.id}">Precio</label><br>
                    <input id="edit-precio-${producto.id}" type="number" value="${producto.precio}"><br><br>
                    <button onclick="guardarProd(${producto.id})">Guardar</button>
                </div>
            </div>
        `).join('');
    }
    return html;
}


async function pedidos(){
    ped = [];
    try {
        const response = await fetch("pedidos.php");
        const data = await response.json();
        data.forEach(pedi => {
            ped.push({
                id: pedi.codigo,
                fecha: pedi.fecha_pedido,
                nombre: pedi.nombre,
                pedido: pedi.pedido,
                direccion: pedi.direccion,
                referencias: pedi.referencias,
                telefono: pedi.telefono,
                correo: pedi.correo,
                estado: pedi.estado,
                montoTotal: pedi.montoTotal,
                pago: pedi.pago
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function pedidospendientesClientes(){
    await pedidos()
    if(ped.length === 0){
        return `<h1>No tiene pedidos pendientes</h1>`
    }
    let html = `
    <table class="tabla-pedidos">
        <thead>
            <tr>
                <th>ID Pedido</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Pedido</th>
                <th>Direccion</th>
                <th>Referencias</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Pago</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tbody">
    `;
    html += ped.map(pe => `               
        <tr id="${pe.id}">
            <td>${pe.id}</td>
            <td>${pe.fecha}</td>
            <td>${pe.nombre}</td>
            <td>${pe.pedido}</td>
            <td class="direccion">${pe.direccion}</td>
            <td class="referencias">${pe.referencias}</td>
            <td class="telefono">${pe.telefono}</td>
            <td class="correo">${pe.correo}</td>
            <td><span class="estado">${pe.estado}</span></td>
            <td>${pe.montoTotal}</td>
            <td>${pe.pago}</td>
            <td>
                ${pe.pago !== 'si' ?
                    `<a href="editarPedido.php" onclick"editarPe(${pe.id})"><button id="editar-${pe.id}" class="btn-editar">Editar</button></a>
                    <a href="pagar.php" onclick="pagar()"><button id="eliminar-${pe.id}" class="btn-eliminar">Pagar</button>`
                    : 'una vez pagado, no puede realizar cambios'
                }
            </td>
        </tr>
    `).join('');
    html += `
        </tbody>
        </table>
    `;
    return html;
}
function editarPe(id){
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'editarPedido.php';
    
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'id';
    input.value = id;
    
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
}
async function pedidospendientesVentas(){
    
    await pedidos()
    const uniquePedidos = [];
    const seenIds = new Set();
    
    ped.forEach(pe => {
        if (!seenIds.has(pe.id)) {
            uniquePedidos.push(pe);
            seenIds.add(pe.id);
        }
    });
    if(ped.length === 0){
        return `<h1>No hay pedidos</h1>`
    }
    let html = `
    <table class="tabla-pedidos">
        <thead>
            <tr>
                <th>ID Pedido</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Pedido</th>
                <th>Direccion</th>
                <th>Referencias</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tbody">
    `;
    html += uniquePedidos.map(pe => `               
        <tr id="${pe.id}">
            <td>${pe.id}</td>
            <td>${pe.fecha}</td>
            <td>${pe.nombre}</td>
            <td>${pe.pedido}</td>
            <td>${pe.direccion}</td>
            <td>${pe.referencias}</td>
            <td>${pe.telefono}</td>
            <td>${pe.correo}</td>
            <td>${pe.estado}</td>
            <td>${pe.montoTotal}</td>
            <td>
                <button id="editar-${pe.id}" class="btn-editar" onclick="entregado(${pe.id})">Entregar</button>
            </td>
        </tr>
    `).join('');
    html += `
        </tbody>
        </table>
    `;
    return html;
}
function cargarProducto(){
    const form = `
        <div id="cargar">
            <label for="nombre">Nombre del producto</label><br>
            <input id="nombre" type="text"><br><br>

            <label for="precio">Precio</label><br>
            <input id="precio" type="number"><br><br>

            <button onclick="enviar()">Guardar</button>
        </div>


        <style>
        
       
        /* General styles for form container */
#cargar {
    widht:90%;
     background: #ee6dd270;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 500px; /* Adjust based on your needs */
    margin: 120px auto; /* Centered horizontally */
}

#cargar label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
    widht:40px;
}

#cargar input[type="text"],
#cargar input[type="number"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 15px; /* Space between input fields */
}

#cargar button {
    background: violet;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s, transform 0.3s;
}

#cargar button:hover {
    background-color: pink;
}

#cargar button:active {
    transform: scale(0.98); /* Slightly shrink button when pressed */
}

        </style>
    `;
    return form;
}
function editarP(productId) {
    const form = document.getElementById(`edit-form-${productId}`);
    if (form.style.display === 'none') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}
function guardarProd(productId) {
    const nombre = document.getElementById(`edit-nombre-${productId}`).value;
    const precio = document.getElementById(`edit-precio-${productId}`).value;

    fetch('consultas/actualizarProd.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: productId,
            nombre: nombre,
            precio: precio
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Producto actualizado correctamente');
            location.reload();
        } else {
            alert('Error al actualizar el producto');
        }
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', async () => {
    const tabs = document.querySelectorAll('.tab');
    const main = document.getElementById('main');

    const updateMainContent = async (contentId) => {
        main.innerHTML = '';
        const html = await contents[contentId];
        main.innerHTML = html;
        
    };

    const contents = {
        'Productos': mostrarProductos('Productos'),
        'PedPendientes': pedidospendientesClientes(),
        'PedPenVentas': pedidospendientesVentas(),
        'EditarProd': mostrarProductos('EditarProd'),
        'CargarProd': cargarProducto()
    };
    updateMainContent('Productos');

    tabs.forEach(tab => {
        tab.addEventListener('click', async () => {
            const contentId = tab.getAttribute('data-content');
            if (contentId in contents) {
                await updateMainContent(contentId);
            }
        });
    });
});