import fs from "node:fs";
import path from "node:path";
import Sequelize from "sequelize";
import configuration from "./sequelize.config.js";

const sequelize = new Sequelize(configuration);

const models = await Promise.all(
  fs
    .readdirSync(path.resolve(import.meta.dirname, "models"))
    .map(async (file) => {
      const module = await import(
        path.join(import.meta.dirname, "models", file)
      );
      return module.default(sequelize, Sequelize.DataTypes);
    })
);

const database = models.reduce((acc, model) => {
  acc[model.name] = model;
  return acc;
}, {});

Object.keys(database).forEach((modelName) => {
  if (database[modelName].associate) {
    database[modelName].associate(database);
  }
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

export default database;
