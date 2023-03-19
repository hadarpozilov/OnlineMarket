import express, { NextFunction, Request, response, Response } from 'express';
import cors from 'cors';
import config from './2-utils/config';
// import { RouteNotFoundError } from './4-models/error-models';
import productsController from './6-controllers/products-controller';
import authController from './6-controllers/auth-controller';
import fileUpload from 'express-fileupload';
import sanitize from "./3-middleware/sanitize";
import citiesController from './6-controllers/cities-controller';
import cartController from './6-controllers/cart-controller';
import cartItemsController from './6-controllers/cart-items-controller';
import orderController from './6-controllers/order-controller';
import path from 'path';
import catchAll from './3-middleware/catch-all';
import dal from './2-utils/dal';

const server = express();

server.use(cors({origin: config.isDevelopment}));

server.use(express.json());
server.use(fileUpload());
server.use(sanitize);

server.use('/api', authController);
server.use('/api', citiesController);
server.use('/api', productsController);
server.use('/api', cartItemsController);
server.use('/api', cartController);
server.use('/api', orderController);

// server.use('*', (request: Request, response: Response, next: NextFunction) => {
//   if (config.isDevelopment) {
//     const error = new RouteNotFoundError(request.method, request.originalUrl);
//     next(error);
//   } else {
//     const indexHtmlFile = path.join(__dirname, '07-frontend', 'index.html');
//     response.sendFile(indexHtmlFile);
//   }
// });

server.use(catchAll);
server.listen(config.port, () => {
  dal.connect()
  console.log(`Listening on http://localhost:${config.port}`)
});
