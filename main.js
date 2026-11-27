// Clase que representa cada producto
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

// Funciones para pedir, procesar y mostrar datos
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

// Catálogo con productos creados a partir de la clase
const productoVela = new Producto(1, "Vela", 5000, 5);
const productoAromatizante = new Producto(2, "Aromatizante", 3500, 8);
const productoCuaderno = new Producto(3, "Cuaderno", 4200, 6);
const productoJabon = new Producto(4, "Jabón", 2800, 10);
const productoBolsa = new Producto(5, "Bolsa de tela", 3000, 4);
const productosEnStock = [productoVela, productoAromatizante, productoCuaderno, productoJabon, productoBolsa];

// Se actualiza el catálogo y se informa el producto retirado
const productoRetirado = productosEnStock.pop();
console.log(`Se ha eliminado el elemento: ${productoRetirado.nombre}`);
productosEnStock.push(new Producto(6, "Llavero", 1500, 12));
productosEnStock.unshift(new Producto(7, "Set matero", 9000, 3));

// Se busca un producto y se informa su posición
const productoBuscado = prompt("¿Qué producto querés buscar en el catálogo?");
const nombresProductos = productosEnStock.map((item) => item.nombre);

if (nombresProductos.includes(productoBuscado)) {
  const posicion = nombresProductos.indexOf(productoBuscado);
  console.log(`${productoBuscado} está en el catálogo, en la posición ${posicion}.`);
} else {
  console.log(`${productoBuscado} no está en el catálogo.`);
}

// Se reemplaza un producto del índice 2
productosEnStock.splice(2, 1, new Producto(8, "Libreta artesanal", 4600, 7));

function listarProductos(lista) {
  console.log("--- Productos disponibles ---");

  for (const item of lista) {
    console.log(`Producto: ${item.nombre} | Precio: $${item.precio} | Stock: ${item.stock}`);
  }

  console.log(`Total: ${lista.length} productos`);
}

listarProductos(productosEnStock);

// Menú de consultas usando métodos de arrays
while (true) {
  const opcion = prompt("Catálogo: 1 buscar producto, 2 ver productos con stock, 3 ver precios, 4 calcular valor del stock. Escribí ESC para seguir al carrito.");

  if (opcion === null || opcion.trim().toUpperCase() === "ESC") {
    break;
  }

  if (opcion === "1") {
    const nombreBuscado = prompt("Escribí el nombre exacto del producto:");
    const productoEncontrado = productosEnStock.find((item) => item.nombre.toLowerCase() === (nombreBuscado || "").trim().toLowerCase());

    if (productoEncontrado) {
      console.log(`Encontrado: ${productoEncontrado.nombre} | Precio: $${productoEncontrado.precio} | Stock: ${productoEncontrado.stock}`);
    } else {
      console.log("No se encontró ese producto.");
    }
  } else if (opcion === "2") {
    const productosDisponibles = productosEnStock.filter((item) => item.stock > 0);
    listarProductos(productosDisponibles);
  } else if (opcion === "3") {
    const preciosDelCatalogo = productosEnStock.map((item) => `${item.nombre}: $${item.precio}`);
    console.log("Precios del catálogo:");
    for (const precio of preciosDelCatalogo) {
      console.log(precio);
    }
  } else if (opcion === "4") {
    const valorTotalStock = productosEnStock.reduce((total, item) => total + item.precio * item.stock, 0);
    console.log(`Valor total del stock: $${valorTotalStock}`);
  } else {
    console.log("Opción no válida.");
  }
}

// Carrito de velas
let cantidadEnCarrito = 0;

while (true) {
  const ingreso = pedirCantidad(
    `¿Cuántas ${productoVela.nombre}(s) querés agregar? Hay ${productoVela.stock}. Escribí ESC para terminar.`
  );
  const resultado = procesarIngreso(ingreso, productoVela.stock);

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

  if (productoVela.vender(resultado.cantidad)) {
    cantidadEnCarrito += resultado.cantidad;
    mostrarResultado(`Agregaste ${resultado.cantidad} ${productoVela.nombre}(s).`, false);
  }
}

mostrarResultado(`Compra terminada. Unidades en el carrito: ${cantidadEnCarrito}. Stock restante de ${productoVela.nombre}: ${productoVela.stock}`, true);
