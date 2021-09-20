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
  pricings: '/events/pricings',
  addPricing: '/events/pricings',
  updatePricing: '/events/pricings'
}

export { Auth, General, Events };
