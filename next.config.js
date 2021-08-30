if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  env: {
    MICROCMS_DOMAIN_NAME: process.env.MICROCMS_DOMAIN_NAME,
    MICROCMS_API_KEY: process.env.MICROCMS_API_KEY,
  },
};
