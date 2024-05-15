import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  MONGODB_CONNECTION_STRING: str(),
  PORT: port(),
  SESSION_SECRET: str(),
  NODE_ENV: str(),
  PAYPAL_CLIENT_ID: str(),
  PAYPAL_APP_SECRET: str(),
  PAYPAL_APP_URL: str(),
  PAYPAL_SANDBOX_URL: str(),
});
