import express, { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import verifyLoggedIn from "../3-middleware/verify-token";
import cartLogic from "../5-logic/carts-logic";

const router = express.Router();

router.get("/cart/",verifyLoggedIn,async (request: Request, response: Response, next: NextFunction) => {
    try {
      let authorizationString = request.headers["authorization"];
      const user_id = cyber.getUserFromToken(authorizationString)._id;
      const cart = await cartLogic.getCart(user_id);
      response.json(cart);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get("/cart/new-cart/",verifyLoggedIn,async (request: Request, response: Response, next: NextFunction) => {
    try {
      let authorizationString = request.headers["authorization"];
      const user_id = cyber.getUserFromToken(authorizationString)._id;
      const cart = await cartLogic.createCart(user_id);
      response.json(cart);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get("/cart/:_id",verifyLoggedIn,async (request: Request, response: Response, next: NextFunction) => {
    try {
      const cart_id = request.params._id;
      let authorizationString = request.headers["authorization"];
      const user_id = cyber.getUserFromToken(authorizationString)._id;
      const cart = await cartLogic.forceNewCart(cart_id, user_id);
      response.json(cart);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
