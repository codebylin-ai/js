// Simulador básico de carrito
const producto = "Taza";
let stock = 5;
let cantidadEnCarrito = 0;
let continuar = true;

while (continuar) {
  const ingreso = prompt(`¿Cuántas ${producto}(s) querés agregar? Hay ${stock}. Escribí ESC para terminar.`);

  if (ingreso === null || ingreso.toUpperCase() === "ESC") {
    continuar = false;
    console.log("Compra terminada.");
  } else if (Number(ingreso) > 0 && Number(ingreso) <= stock) {
    cantidadEnCarrito += Number(ingreso);
    stock -= Number(ingreso);
    console.log(`Agregaste ${ingreso} ${producto}(s).`);
  } else {
    console.log("Cantidad no válida o sin stock suficiente.");
  }
}

console.log(`Unidades en el carrito: ${cantidadEnCarrito}`);
