import jwt from "jsonwebtoken";
import { IUserModel } from "../4-models/user-model";
import crypto from "crypto";

const salt = "MakeThingsGoRight"; 
const secretKey = "KittensAreCute";

function hash(plainText: string): string {
  if (!plainText) return null;
  const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex") 
  return hashedText;
}

function getNewToken(user: IUserModel): string {
  const payload = { user };
  const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });

  return token;
}

function verifyToken(autorizationHeader: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    if (!autorizationHeader) {
      resolve(false);
      return;
    }
    const token = autorizationHeader.split(" ")[1];
    if (!token) {
      resolve(false);
      return;
    }

    jwt.verify(token, secretKey, (error) => {
      if (error) {
        resolve(false);
        return;
      }
      resolve(true);
    });
  });
}

function getUserFromToken(autorizationHeader: string): IUserModel {
  const token = autorizationHeader.split(" ")[1];
  const payload: any = jwt.decode(token);
  const user = payload.user;
  return user;
}

export default {
  hash,
  getNewToken,
  verifyToken,
  getUserFromToken,
};
