import jsonwebtoken from "jsonwebtoken";
import { Request } from "express";

const secret = "secret_key";

export const JWT = {
  generate(value: {}, exprires: string) {
    return jsonwebtoken.sign(value, secret, {expiresIn: exprires});
  },

  verify(req: Request) {
    const {authorization} = req.headers;
    if (!authorization) {
      return null;
    }
    try {
      return JSON.parse(JSON.stringify(jsonwebtoken.verify(authorization, secret)))
    } catch (e) {
      return false
    }
  },
};
