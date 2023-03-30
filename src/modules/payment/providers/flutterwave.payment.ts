import axios from 'axios';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const envData: any = dotenv.parse(fs.readFileSync('.env'));

type InitiatePaymentResponse = {
  status: string;
  message: string;
  data: {
    link: string;
  };
};
export const initiateFlutterwavePayment = async (paymentData) => {
  try {
    const { data } = await axios.post<InitiatePaymentResponse>(
      `https://api.flutterwave.com/v3/payments`,
      { ...paymentData },
      { headers: { Authorization: `Bearer ${envData.FLW_SECRET_KEY}` } },
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
};
