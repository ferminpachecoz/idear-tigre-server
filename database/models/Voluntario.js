module.exports = function(sequelize, dataTypes){
  let alias="Voluntario";

  let cols = {
      id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      title: {
          type: dataTypes.STRING
      },
      description: {
          type: dataTypes.STRING
      },
      image: {
          type: dataTypes.STRING
      },
      ayudar: {
          type: dataTypes.STRING
      },
      donar: {
          type: dataTypes.STRING
      },
  }

  let config = {
      tableName: "voluntario",
      timestamps: false,
  }

  let Voluntario = sequelize.define(alias, cols, config);

  return Voluntario;
}