import fs from "node:fs";
import path from "node:path";
import Sequelize from "sequelize";
import process from "node:process";
import dotenv from "dotenv";

dotenv.config({
  path: `./env/.env.${process.env.NODE_ENV || "development"}`,
});

const sequelize = new Sequelize({
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  logging: process.env.NODE_ENV !== "development",
  storage: process.env.DATABASE_STORAGE || undefined,
});

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
