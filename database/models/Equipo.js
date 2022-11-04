module.exports = function(sequelize, dataTypes){
  let alias="Equipo";

  let cols = {
      id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      name: {
          type: dataTypes.STRING
      },
      image: {
          type: dataTypes.STRING
      },
      linkedin: {
          type: dataTypes.STRING
      },
  }

  let config = {
      tableName: "equipo",
      timestamps: false,
  }

  let Equipo = sequelize.define(alias, cols, config);

  return Equipo;
}