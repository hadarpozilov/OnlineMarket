import express, { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import verifyLoggedIn from "../3-middleware/verify-token";
import { OrderModel } from "../4-models/order-model";
import ordersLogic from "../5-logic/orders-logic";

const router = express.Router();

router.get("/order/cities/",async (request: Request, response: Response, next: NextFunction) => {
    try {
      const cities = await ordersLogic.getCities();
      response.json(cities);
    } catch (err: any) {
      next(err);
    }
  }
);
router.get("/order/number-of-orders/",async (request: Request, response: Response, next: NextFunction) => {
    try {
      const numerOfOrders = await ordersLogic.getNumberOfOrders();
      response.json(numerOfOrders);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get("/order/last-order/",verifyLoggedIn,async (request: Request, response: Response, next: NextFunction) => {
    try {
      const authorizationString = request.headers["authorization"];
      const user_id = cyber.getUserFromToken(authorizationString)._id;
      const lastOrder = await ordersLogic.getLastOrder(user_id);
      response.json(lastOrder);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post("/order",verifyLoggedIn,async (request: Request, response: Response, next: NextFunction) => {
    try {
      const order = new OrderModel(request.body);
      const orderResponse = await ordersLogic.addOrder(order);
      response.json(orderResponse);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post("/order/check-date/",verifyLoggedIn,async (request: Request, response: Response, next: NextFunction) => {
    try {
      const date = request.body.date;
      const isDateBad = await ordersLogic.checkDate(date);
      response.json(isDateBad);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
