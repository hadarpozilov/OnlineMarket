// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //Auth URL's.
  preRegisterUrl: "http://localhost:3001/api/auth/pre-register/",
  registerUrl: "http://localhost:3001/api/auth/register/",
  loginUrl: "http://localhost:3001/api/auth/login/",

  //Categories URL's.
  catgoriesUrl: "http://localhost:3001/api/products/categories/",

  //Products URL's.
  productsUrl: "http://localhost:3001/api/products/",
  productsByCategoryUrl:
    "http://localhost:3001/api/products/products-by-category/",
  productImageUrl: "http://localhost:3001/api/products/images/",
  numberOfProductsUrl: "http://localhost:3001/api/products/number-of-products/",
  productsSearchByPatternUrl:
    "http://localhost:3001/api/products/products-search/",

  //Carts URL's.
  cartUrl: "http://localhost:3001/api/cart/",
  cartNewUrl: "http://localhost:3001/api/cart/new-cart/",
  cartItemsUrl: "http://localhost:3001/api/cart/cart-items/",
  removeAllCartItemsUrl:
    "http://localhost:3001/api/cart/cart-items/remove-all/",

  //Order URL.
  orderUrl: "http://localhost:3001/api/order/",
  orderCheckDateUrl: "http://localhost:3001/api/order/check-date/",
  orderCitiesUrl: "http://localhost:3001/api/order/cities/",
  numberOfOrdersUrl: "http://localhost:3001/api/order/number-of-orders/",
  lastOrderUrl: "http://localhost:3001/api/order/last-order/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
