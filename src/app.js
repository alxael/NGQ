import express from "express";
import dotenv from "dotenv";
import middlewares from "./middlewares/middlewares.js";
import { createHandler } from "graphql-http";
import schema from "./graphql/schema.js";

dotenv.config({
  path: `./env/.env.${process.env.NODE_ENV || "development"}`,
});

const PORT = process.env.SERVER_PORT;

const app = express();

app.get((req, res) => {
    res.send("ok");
})

app.all(
  "/graphql",
  middlewares,
  createHandler({
    schema,
    context: (req) => {
      return {
        userId: req.raw.userId || null,
      };
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
