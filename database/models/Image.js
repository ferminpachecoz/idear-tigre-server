module.exports = function(sequelize, dataTypes){
  let alias="Image";

  let cols = {
      id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      title: {
          type: dataTypes.STRING
      },
      image: {
          type: dataTypes.STRING
      },
      id_category:{
        type: dataTypes.INTEGER
      }
  }

  let config = {
      tableName: "images",
      timestamps: false,
  }

  let Image = sequelize.define(alias, cols, config);

  Image.associate = function(models){
    Image.belongsTo(models.Category, {
        as: "images",
        foreignKey: 'id_category',
    });
}

  return Image;
}