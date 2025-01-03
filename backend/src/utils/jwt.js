import JsonWebToken from "jsonwebtoken";
import "dotenv/config";

/**
 * Generates a JSON Web Token as access token that contains user information
 * and signs it with the secret defined in environment variable JWT_SECRET.
 * The token is valid for the amount of seconds defined in environment variable
 * JWT_EXPIRES_IN or 1800 seconds (30 minutes) if not defined.
 * @param {Object} user - The user object to be signed in the token
 * @returns {String} The generated access token
 */
export const generateAccessToken = (user) => {
  return JsonWebToken.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1800s",
  });
};

/**
 * Generates a JSON Web Token as refresh token that contains user information
 * and signs it with the secret defined in environment variable JWT_REFRESH_SECRET.
 * The token is valid for the amount of seconds defined in environment variable
 * JWT_REFRESH_EXPIRES_IN or 3600 seconds (1 hour) if not defined.
 * @param {Object} user - The user object to be signed in the token
 * @returns {String} The generated refresh token
 */
export const generateRefreshToken = (user) => {
  return JsonWebToken.sign(user, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "3600s",
  });
};

function verifyRefreshToken(token) {
  try {
    return JsonWebToken.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    return error;
  }
}

const parseJwt = (token) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

const verifyAccessToken = (token) => {
  try {
    return JsonWebToken.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return error;
  }
};
export { verifyAccessToken, parseJwt, verifyRefreshToken };
