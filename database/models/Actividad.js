module.exports = function(sequelize, dataTypes){
  let alias="Actividad";

  let cols = {
      id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      title: {
          type: dataTypes.STRING
      },
      startDate: {
          type: dataTypes.DATE
      },
      endDate: {
          type: dataTypes.DATE
      },
      allDay: {
          type: dataTypes.BOOLEAN
      },
      notes: {
        type: dataTypes.STRING
      }
  }

  let config = {
      tableName: "actividades",
      timestamps: false,
  }

  let Actividad = sequelize.define(alias, cols, config);

  return Actividad;
}