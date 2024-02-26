import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

export const genarateToken = async (
  paylode: { userId: number },
  secret: Secret
) => {
  const token = jwt.sign(paylode, secret, {
    expiresIn: "1d",
  });
  return token;
};

const getUserInfoFromToken = async (token: string) => {
  try {
    const userData = jwt.verify(token, config.jwt.secret as string) as {
      userId: number;
    };
    // console.log(userData, "userData");
    return userData;
  } catch (error) {
    return null;
  }
};

export const jwtHealper = {
  genarateToken,
  getUserInfoFromToken,
};
