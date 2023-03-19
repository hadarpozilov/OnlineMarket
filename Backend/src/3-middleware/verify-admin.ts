import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { ForbiddenError, UnauthorizedError } from "../4-models/error-models";
 
async function verifyAdmin(request: Request, response: Response, next: NextFunction) {
    const authorizationHeader = request.header('authorization')

    try {         
        const isValid = await cyber.verifyToken(authorizationHeader)
  if (!isValid) {
    next(new UnauthorizedError("You are not admin"))
    return
  }

  const role = cyber.getUserFromToken(authorizationHeader)
  if (role.isAdmin == false) {
    next()
    return
  }
        next();
    }    catch (error) { 
        next(error);
    }


}

export default verifyAdmin;
