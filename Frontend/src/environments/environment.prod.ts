export const environment = {
  production: true,
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