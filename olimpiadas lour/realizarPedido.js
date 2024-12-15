document.getElementById("payment-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const shippingInfo = {
      fullName: document.getElementById("full-name").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zip: document.getElementById("zip").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      reference: document.getElementById("reference").value
  };
  let pedi = "";
  let total = 0;
  for (let clave in carrito) {
      let item = carrito[clave];
      if (item.precio !== undefined && item.cantidad !== undefined) {
          pedi += `${item.cantidad} - ${item.nombre}, `;
          total += item.precio * item.cantidad;
      }
  }

  if (pedi.endsWith(", ")) {
      pedi = pedi.slice(0, -2);
  }

  const hiddenData = {
      name: document.getElementById("usuario").value,
      fechaPedido: new Date().toISOString().slice(0, 10),
      pedido: pedi,
      precio: total
  };

  const finalData = {
      ...shippingInfo,
      ...hiddenData
  };
  console.log(finalData);
  fetch('consultas/anadirpedido.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(finalData)
  }).then(response => response.text())
    .then(data => window.location.href = 'carrito.php')
    .catch(error => console.error('Error:', error));
    vaciarCarrito()
});
function vaciarCarrito() {
    localStorage.removeItem('carrito');
}