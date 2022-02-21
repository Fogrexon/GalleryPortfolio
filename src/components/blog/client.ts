import { createClient } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: process.env.MICROCMS_DOMAIN_NAME,
  apiKey: process.env.MICROCMS_API_KEY,
});

export default client;
