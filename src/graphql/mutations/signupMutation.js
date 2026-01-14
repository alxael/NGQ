import database from "../../database/database.js";
import userType from "../types/user/userType.js";
import bcrypt from "bcrypt";
import signupInputType from "../types/auth/signupInputType.js";
import { Roles } from "../../database/models/role.js";

const signupMutationResolver = async (_, { user }, context) => {
  const password = await bcrypt.hash(user.password, 11);

  const country = await database.Country.findOne({
    where: { code: user.countryCode },
  });
  if (!country) {
    throw new Error("Country not found!");
  }

  const userRole = await database.Role.findOne({
    where: { name: Roles.User },
  });
  if (!userRole) {
    throw new Error("User role not found!");
  }

  const createdUser = await database.User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    countryId: country.id,
    password,
  });

  await createdUser.addRole(userRole);

  return createdUser;
};

const signupMutation = {
  type: userType,
  args: {
    user: { type: signupInputType },
  },
  resolve: signupMutationResolver,
};

export default signupMutation;
