import express from "express";
import dotenv from "dotenv";
import { createHandler } from "graphql-http/lib/use/express";
import middlewares from "./middlewares/middlewares.js";
import schema from "./graphql/schema.js";

dotenv.config({
  path: `./env/.env.${process.env.NODE_ENV || "development"}`,
});

const PORT = process.env.SERVER_PORT;

const app = express();
app.use(express.json());

app.all(
  "/graphql",
  middlewares,
  createHandler({
    schema,
    context: (req) => {
      return {
        userId: req.raw.userId,
      };
    },
  })
);

app.listen(PORT, () => {
  console.log(`GraphQL server is running on http://localhost:${PORT}/graphql`);
});
