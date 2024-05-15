'use client';
import { css, cva } from 'styled-system/css';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axios from '@/apis/axios';
import {
  PointAmountResponse,
  PointHistoryResponse,
} from '@/types/api/response';
import DatePicker from '@/components/common/DatePicker';
import { useState } from 'react';

const Point = () => {
  const point = useQuery<number>({
    queryKey: ['me', 'point'],
    queryFn: async () => {
      const res = await axios.get<PointAmountResponse>('/point/amount');
      return res.data.data.point ?? 0;
    },
  });

  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [date, setDate] = useState<string[]>([
    startOfMonth.toLocaleDateString('fr-CA'),
    today.toLocaleDateString('fr-CA'),
  ]);

  const getPointHistory = async () => {
    return await axios
      .get<PointHistoryResponse>(
        `/point/history?start=${date[0]}&end=${date[1]}`,
      )
      .then((res) => {
        return res.data.data;
      });
  };

  const pointHistory = useQuery({
    queryKey: [date[0], date[1]],
    queryFn: getPointHistory,
  });
  const item = cva({
    base: {
      textStyle: 'headline1.bold',
    },
    variants: {
      status: {
        gain: {
          color: 'status.positive',
        },
        loss: {
          color: 'status.negative',
        },
      },
    },
  });

  return (
    <div>
      <header
        className={css({
          textStyle: 'title3.bold',
          color: 'label.normal',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        내 포인트
      </header>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          px: '1rem',
          py: '1.25rem',
        })}
      >
        <span
          className={css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bg: 'primary.normal',
            w: 'full',
            h: '5rem',
            textStyle: 'title3.bold',
            borderRadius: '0.625rem',
          })}
        >
          {point.data?.toLocaleString() ?? 0}
          <Image
            src="/coin.svg"
            width={24}
            height={24}
            alt="coin"
            style={{ marginLeft: '0.3rem' }}
          />
        </span>

        <div className={css({ my: '1rem' })}>
          <DatePicker date={date} setDate={setDate} />
        </div>
        {Array.isArray(pointHistory?.data) &&
          pointHistory?.data.map((history, index) => {
            return (
              <div
                key={index}
                className={css({
                  display: 'flex',
                  w: 'full',
                  justifyContent: 'space-between',
                  mb: '0.625rem',
                })}
              >
                <div
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                  })}
                >
                  <span
                    className={css({
                      textStyle: 'body1.reading.regular',
                    })}
                  >
                    {history.content}
                  </span>
                  <span
                    className={css({
                      textStyle: 'label1.reading.medium',
                    })}
                  >
                    {history.date.split('.')[0].replace('T', ' ')}
                  </span>
                </div>
                <div
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  })}
                >
                  <span
                    className={item({
                      status:
                        history.point > 0
                          ? 'gain'
                          : history.point < 0
                            ? 'loss'
                            : undefined,
                    })}
                  >
                    {history.point > 0 ? '+' : ''}
                    {history.point.toLocaleString()}
                  </span>
                  <span
                    className={css({
                      textStyle: 'label1.reading.regular',
                      color: 'label.alternative',
                    })}
                  >
                    잔액{history.totalPoint}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Point;
