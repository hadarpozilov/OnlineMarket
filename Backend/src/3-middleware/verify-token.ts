import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../4-models/error-models";
import cyber from "../2-utils/cyber";

async function verifyToken(request: Request, response: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = request.header("authorization"); 
    try {
        await cyber.verifyToken(authorizationHeader);        
        next();
    } catch (error) {
        next(error);
    }
}

export default verifyToken