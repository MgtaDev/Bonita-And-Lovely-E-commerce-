const { DataTypes } = require('sequelize');

// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // Defino el modelo
  const Cliente = sequelize.define('Cliente', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    
    activa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { tableName: 'cliente',timestamps: false }
  );

  return Cliente
};
