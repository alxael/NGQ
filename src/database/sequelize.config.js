import dotenv from "dotenv";

dotenv.config({
  path: `./env/.env.${process.env.NODE_ENV || "development"}`,
});

let configuration;
if (process.env.NODE_ENV === "development") {
  configuration = {
    dialect: process.env.DATABASE_DIALECT,
    storage: process.env.DATABASE_STORAGE,
  };
} else {
  configuration = {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  };
}

const finalConfiguration = configuration;
export default finalConfiguration;
