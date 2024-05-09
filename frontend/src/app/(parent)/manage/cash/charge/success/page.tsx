'use client';
import { confirm } from '@/apis/toss';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from '@/apis/axios';

const ChargeSuccess = () => {
  const searchParams = useSearchParams();
  useEffect(() => {
    const doConfirm = async (
      amount: string,
      orderId: string,
      paymentKey: string,
    ) => await confirm(amount, orderId, paymentKey);

    const orderId = searchParams?.get('orderId');
    const amount = searchParams?.get('amount');
    const paymentKey = searchParams?.get('paymentKey');
    if (orderId && amount && paymentKey) {
      const tossResponse = doConfirm(amount, orderId, paymentKey);

      tossResponse.then(async (res) => {
        const result = await axios.post<string>('/pay/confirm', {
          status: res.status,
          orderId: res.orderId,
          paymentKey: res.paymentKey,
          amount: res.card?.amount,
        });
      });
    }
  }, [searchParams]);

  return <div>충전 성공</div>;
};

export default ChargeSuccess;
