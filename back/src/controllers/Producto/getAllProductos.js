const { Producto } = require('../../db');

module.exports = async () => {
  try {
    const productos = await Producto.findAll();

    // Concatenar "col-" al ID de cada color
    productos.forEach((producto) => {
      producto.dataValues.id = `col-${producto.dataValues.id}`;
    });

    return productos;
  } catch (error) {
    console.error('Error al obtener los colores:', error.message);
    throw error;
  }
};
