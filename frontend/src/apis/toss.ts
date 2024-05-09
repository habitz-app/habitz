'use server';
import axios from 'axios';

const confirm = async (amount: string, orderId: string, paymentKey: string) => {
  const secretKey = process.env.TOSS_SECRET_KEY;
  const basicToken = Buffer.from(`${secretKey}:`, 'utf-8').toString('base64');

  const res = await axios
    .post(
      `https://api.tosspayments.com/v1/payments/confirm`,
      {
        amount,
        orderId,
        paymentKey,
      },
      {
        headers: {
          Authorization: `Basic ${basicToken}`,
          'Content-Type': 'application/json',
        },
      },
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

export { confirm };
