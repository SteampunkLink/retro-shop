import "dotenv/config";
import env from "./validateEnv";

import { OrderModel } from "../models/orderModel";

const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET, PAYPAL_APP_URL } = env;

async function getPayPalAccessToken() {
  // Authorization header requires base64 encoding
  const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_APP_SECRET).toString(
    "base64"
  );

  const url = `${PAYPAL_APP_URL}/v1/oauth2/token`;

  const headers = {
    Accept: "application/json",
    "Accept-Language": "en_US",
    Authorization: `Basic ${auth}`,
  };

  const body = "grant_type=client_credentials";
  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  if (!response.ok) throw new Error("Failed to get access token");

  const paypalData = await response.json();

  return paypalData.access_token;
}

export async function checkIfNewTransaction(
  orderModel: OrderModel,
  paypalTransactionId: string
) {
  try {
    // Find all documents where Order.paymentResult.id is the same as the id passed paypalTransactionId
    const orders = await orderModel.find({
      "paymentResult.id": paypalTransactionId,
    });

    // If there are no such orders, then it's a new transaction.
    return orders.length === 0;
  } catch (err) {
    console.error(err);
  }
}

export async function verifyPayPalPayment(paypalTransactionId: string) {
  const accessToken = await getPayPalAccessToken();
  const paypalResponse = await fetch(
    `${PAYPAL_APP_URL}/v2/checkout/orders/${paypalTransactionId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!paypalResponse.ok) throw new Error("Failed to verify payment");

  const paypalData = await paypalResponse.json();
  return {
    verified: paypalData.status === "COMPLETED",
    value: paypalData.purchase_units[0].amount.value,
  };
}
