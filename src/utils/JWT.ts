import jsonwebtoken from "jsonwebtoken";
import { Request } from "express";

const secret = "secret_key";

// jwt config
export const JWT = {
  generate(value: {}, expires: string) {
    return jsonwebtoken.sign(value, secret, {expiresIn: expires});
  },

  verify(req: Request) {
    const {token} = req.headers;
    if (!token) {
      return null;
    }
    try {
      return JSON.parse(JSON.stringify(jsonwebtoken.verify(String(token), secret)))
    } catch (e) {
      return false
    }
  },
};
