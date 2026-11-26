class Producto {
  constructor(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  vender(cantidad) {
    if (cantidad > 0 && cantidad <= this.stock) {
      this.stock -= cantidad;
      return true;
    }

    return false;
  }
}


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


const productoTaza = new Producto(1, "Taza", 5000, 5);
const productoVela = new Producto(2, "Vela", 3500, 8);
const productoCuaderno = new Producto(3, "Cuaderno", 4200, 6);
const productoJabon = new Producto(4, "Jabón", 2800, 10);
const productoBolsa = new Producto(5, "Bolsa de tela", 3000, 4);
const productosEnStock = [productoTaza, productoVela, productoCuaderno, productoJabon, productoBolsa];


const productoRetirado = productosEnStock.pop();
console.log(`Se ha eliminado el elemento: ${productoRetirado.nombre}`);
productosEnStock.push(new Producto(6, "Llavero", 1500, 12));
productosEnStock.unshift(new Producto(7, "Set matero", 9000, 3));


const productoBuscado = prompt("¿Qué producto querés buscar en el catálogo?");
const nombresProductos = productosEnStock.map((item) => item.nombre);

if (nombresProductos.includes(productoBuscado)) {
  const posicion = nombresProductos.indexOf(productoBuscado);
  console.log(`${productoBuscado} está en el catálogo, en la posición ${posicion}.`);
} else {
  console.log(`${productoBuscado} no está en el catálogo.`);
}


productosEnStock.splice(2, 1, new Producto(8, "Libreta artesanal", 4600, 7));

function listarProductos(lista) {
  console.log("--- Productos disponibles ---");

  for (const item of lista) {
    console.log(`Producto: ${item.nombre} | Precio: $${item.precio} | Stock: ${item.stock}`);
  }

  console.log(`Total: ${lista.length} productos`);
}

listarProductos(productosEnStock);

let cantidadEnCarrito = 0;

while (true) {
  const ingreso = pedirCantidad(
    `¿Cuántas ${productoTaza.nombre}(s) querés agregar? Hay ${productoTaza.stock}. Escribí ESC para terminar.`
  );
  const resultado = procesarIngreso(ingreso, productoTaza.stock);

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

  if (productoTaza.vender(resultado.cantidad)) {
    cantidadEnCarrito += resultado.cantidad;
    mostrarResultado(`Agregaste ${resultado.cantidad} ${productoTaza.nombre}(s).`, false);
  }
}

mostrarResultado(`Compra terminada. Unidades en el carrito: ${cantidadEnCarrito}. Stock restante de ${productoTaza.nombre}: ${productoTaza.stock}`, true);
