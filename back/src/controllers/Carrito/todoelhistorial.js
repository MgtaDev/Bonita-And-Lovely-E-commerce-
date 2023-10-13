const { Carrito, Producto, Color, Cliente } = require('../../db');

module.exports = async () => {
  try {    
    const carritoExistente = await Carrito.findAll({
      where: {
        pagado: true,
      },
    });

    if (!carritoExistente.length) {
      return [];
    }

    const productos = [];

    for (const carrito of carritoExistente) {
      const clienteId = carrito.clienteId; // Obtener el clienteId del carrito

      const clienteDetalles = await Cliente.findByPk(clienteId, {
        attributes: ['name'], // Ajusta esto según los campos de tu modelo Cliente
      });

      for (const producto of carrito.dataValues.productos) {
        const productoDetalles = await Producto.findByPk(producto.productoId, {
          attributes: ['name', 'precio_venta','descripcion', 'imagenPrincipal'],
        });
        const colorDetalles = await Color.findByPk(producto.colorId, {
          attributes: ['name'],
        });

        if (productoDetalles) {
          productos.push({
            clienteId: clienteId,
            clienteName: clienteDetalles.name, // Agregar el nombre del cliente
            colorId: producto.colorId,
            colorName: colorDetalles.name,
            cantidad: producto.cantidad,
            productoId: producto.productoId,
            productoName: productoDetalles.name,
            productoPrecio: productoDetalles.precio_venta,
            descripcion:productoDetalles.descripcion,
            imagenPrincipal:productoDetalles.imagenPrincipal,
            inventarioId: producto.inventarioId,
            fechaCompra: carrito.dataValues.fechaCompra,
          });
        }
      }
    }

    return productos;
  } catch (error) {
    console.error('Error al ver registro en el carrito:', error.message);
    throw error;
  }
};
