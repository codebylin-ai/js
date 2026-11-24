// Simulador básico de carrito
const producto = "Taza";
let stock = 5;
let cantidadEnCarrito = 0;

function pedirCantidad(mensaje) {
  return prompt(mensaje);
}

function procesarIngreso(ingreso, stockDisponible) {
  if (ingreso === null || ingreso.trim().toUpperCase() === "ESC") {
    return { estado: "salir", cantidad: 0 };
  }

  const cantidad = Number(ingreso);

  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    return { estado: "invalida", cantidad: 0 };
  }

  if (cantidad > stockDisponible) {
    return { estado: "sin-stock", cantidad: 0 };
  }

  return { estado: "agregar", cantidad: cantidad };
}

const mostrarResultado = (mensaje, esFinal) => {
  console.log(mensaje);

  if (esFinal) {
    alert(mensaje);
  }
};

function listarProductos(lista) {
  console.log("--- Productos disponibles ---");

  for (const item of lista) {
    console.log(`Producto: ${item}`);
  }

  console.log(`Total: ${lista.length} productos`);
}

const productosEnStock = ["Taza", "Vela", "Cuaderno", "Jabón", "Bolsa de tela"];
productosEnStock.push("Llavero");
productosEnStock.unshift("Set matero");

const productoRetirado = productosEnStock.pop();
console.log(`Se ha eliminado el elemento: ${productoRetirado}`);

const productoBuscado = prompt("¿Qué producto querés buscar en el catálogo?");

if (productosEnStock.includes(productoBuscado)) {
  const posicion = productosEnStock.indexOf(productoBuscado);
  console.log(`${productoBuscado} está en el catálogo, en la posición ${posicion}.`);
} else {
  console.log(`${productoBuscado} no está en el catálogo.`);
}

productosEnStock.splice(2, 1, "Libreta artesanal");
listarProductos(productosEnStock);

while (true) {
  const ingreso = pedirCantidad(
    `¿Cuántas ${producto}(s) querés agregar? Hay ${stock}. Escribí ESC para terminar.`
  );
  const resultado = procesarIngreso(ingreso, stock);

  if (resultado.estado === "salir") {
    break;
  }

  if (resultado.estado === "invalida") {
    mostrarResultado("Ingresá una cantidad válida.", false);
    continue;
  }

  if (resultado.estado === "sin-stock") {
    mostrarResultado("No hay stock suficiente.", false);
    continue;
  }

  cantidadEnCarrito += resultado.cantidad;
  stock -= resultado.cantidad;
  mostrarResultado(`Agregaste ${resultado.cantidad} ${producto}(s).`, false);
}

mostrarResultado(`Compra terminada. Unidades en el carrito: ${cantidadEnCarrito}`, true);
