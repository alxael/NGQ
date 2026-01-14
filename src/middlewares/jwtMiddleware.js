import jwt from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    next();
    return;
  }

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedPayload.userId;
    next();
  } catch (error) {
    console.info("Invalid JWT token: ", error.message);
    req.userId = null;
    next();
  }
};

export default jwtMiddleware;
