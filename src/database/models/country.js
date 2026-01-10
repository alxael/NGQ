import { Model } from "sequelize";

const initializeCountry = (sequelize, DataTypes) => {
  class Country extends Model {
    static associate(models) {
      Country.hasMany(models.User);
    }
  }

  Country.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(2),
        unique: true,
        allowNull: false,
      },
      ibanPattern: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Country",
      tableName: "Countries",
    }
  );

  return Country;
};
export default initializeCountry;
