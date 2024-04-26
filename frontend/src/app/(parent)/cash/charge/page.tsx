'use client';
import { useRouter, usePathname } from 'next/navigation';
import React, { use, useState } from 'react';
import { HStack } from 'styled-system/jsx';

const Charge = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const dummyHabitz: number = 7400;
  const dummyChargeButtonArray: number[] = [10000, 50000, 100000, 500000];
  const [charge, setCharge] = useState<number | null>(null);
  const inputChargeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: number = parseInt(e.target.value);
    if (Number.isNaN(value) || value < 0) {
      value = 0;
    }
    setCharge(value);
  };
  const chargeHandler = () => {
    if (charge !== null) {
      // Charge Logic
      if (charge >= 1000) {
        alert(`${charge}원이 충전되었습니다.`);
        router.push(currentPath + '/success');
      } else {
        alert('1000원 이상의 금액을 입력해주세요.');
        router.push(currentPath + '/fail');
      }
    } else {
      alert('충전할 금액을 입력해주세요.');
    }
  };
  return (
    <div>
      <h1>충전</h1>
      <div>
        <input
          type="number"
          value={charge !== null ? charge : undefined}
          onChange={(e) => {
            inputChargeHandler(e);
          }}
          placeholder="얼마를 충전할까요?"
          step={1000}
        />
      </div>
      <div>
        <HStack>
          <p>보유 포인트</p>
          <p>{dummyHabitz}</p>
        </HStack>
        <HStack>
          <p>충전 후 포인트</p>
          <p>{dummyHabitz + (charge ? charge : 0)}</p>
        </HStack>
      </div>
      <HStack>
        {dummyChargeButtonArray.map((button, index) => (
          <button
            key={index}
            onClick={() => setCharge((charge ? charge : 0) + button)}
          >
            +{button / 10000}만
          </button>
        ))}
      </HStack>
      <div>
        <button onClick={chargeHandler}>충전하기</button>
      </div>
    </div>
  );
};

export default Charge;
