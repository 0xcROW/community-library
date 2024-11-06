import "dotenv/config";
import jwt from "jsonwebtoken";
import userService from "../services/user.services.js";

export function authMiddleware(req, res, next) {
  const tokenHeader = req.headers.authorization; // Get token from header
  if (!tokenHeader) return res.status(401).send("No token informed, access denied"); // If no token, return 401

  const tokenSplit = tokenHeader.split(" "); // Split the token into an array
  if (tokenSplit.length !== 2) return res.status(401).send("Invalid token, access denied"); // If token is not in the format 'Bearer token', return 401

  if (!/^Bearer$/i.test(tokenSplit[0])) return res.status(401).send("Malformatted token, access denied"); // If no regex match on the first position, return 401

  jwt.verify(tokenSplit[1], process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send({message:"Invalid Token", error: err.message});
    }

    const user = await userService.findUserByIdService(decoded.id);
    if (!user || !user.id) {
      return res.status(401).send("Invalid Token");
    }

    req.userId = user.id;
    return next();
  });


}