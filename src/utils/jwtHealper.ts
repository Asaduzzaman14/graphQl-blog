import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

export const jwtHealper = async (
  paylode: { userId: number },
  secret: Secret
) => {
  const token = jwt.sign(paylode, secret, {
    expiresIn: "1d",
  });
  return token;
};
