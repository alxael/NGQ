import loginInputType from "../types/auth/loginInputType.js";
import loginResultType from "../types/auth/loginResultType.js";
import jwt from "jsonwebtoken";
import database from "../../database/database.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({
  path: `./env/.env.${process.env.NODE_ENV || "development"}`,
});

const loginMutationResolver = async (_, args) => {
  const user = await database.User.findOne({
    where: {
      email: args.credentials.email,
    },
  });

  if (!user) {
    return {
      token: null,
    };
  }

  const providedPassword = args.credentials.password;
  const userPassword = user.password;

  const passwordIsValid = await bcrypt.compare(providedPassword, userPassword);

  if (!passwordIsValid) {
    return {
      token: null,
    };
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME_SECONDS,
  });

  return {
    token,
  };
};

const loginMutation = {
  type: loginResultType,
  args: {
    credentials: { type: loginInputType },
  },
  resolve: loginMutationResolver,
};

export default loginMutation;
