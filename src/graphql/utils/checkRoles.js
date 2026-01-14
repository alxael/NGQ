import database from "../../database/database.js";

const checkRoles = async (userId, roles) => {
  if (!userId) {
    throw new Error("Access denied!");
  }

  const user = await database.User.findByPk(userId);

  if (!user) {
    return false;
  }

  const userRoles = new Set((await user.getRoles()).map((role) => role.name));
  const hasAccess = roles.some((role) => userRoles.has(role));

  if (!hasAccess) {
    throw new Error("Access denied!");
  }
};

export default checkRoles;
