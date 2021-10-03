const Auth = {
  login: '/auth/login',
  signup: '/auth/signup',
  activate: '/auth/activate-account',
};

const General = {
  contactus: '/contactus'
};

const Events = {
  create: '/events',
  update: '/events',
  getOne: '/events',
  all: '/events',
  deleteOne: '/events',

  // pricings
  pricings: '/events/pricelist',
  addPricing: '/events/pricelist',
  updatePricing: '/events/pricelist',
  getPrice: '/events/pricings',

  // purchases
  purchase: '/events/purchase'
}

export { Auth, General, Events };
