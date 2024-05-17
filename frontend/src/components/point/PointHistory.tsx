import { HStack, Stack } from 'styled-system/jsx';
import { Button } from '../ui/button';
import * as RadioButtonGroup from '~/components/ui/radio-button-group';
import { caretDown } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { css } from 'styled-system/css';
import { HabitzHistoryResponse, HabitzHistory } from '@/types/api/response';
import Image from 'next/image';
import { useState } from 'react';

export const Category = ({
  setCategory,
  ...props
}: {
  setCategory: (value: string) => void;
  props?: RadioButtonGroup.RootProps;
}) => {
  const options = [{ value: '전체' }, { value: '충전' }, { value: '사용' }];

  return (
    <RadioButtonGroup.Root
      defaultValue="전체"
      w="full"
      onValueChange={(val: { value: string }) => {
        console.log(val.value);
        setCategory(val.value);
      }}
      {...props}
    >
      {options.map((option, id) => (
        <RadioButtonGroup.Item
          key={id}
          value={option.value}
          px="0"
          w="3.75rem"
          h="1.875rem"
          rounded={'1.25rem'}
          textStyle={'headline1.bold'}
        >
          <RadioButtonGroup.ItemControl />
          <RadioButtonGroup.ItemText>{option.value}</RadioButtonGroup.ItemText>
        </RadioButtonGroup.Item>
      ))}
    </RadioButtonGroup.Root>
  );
};

const PointHistory = ({ history }: { history: HabitzHistoryResponse }) => {
  const [category, setCategory] = useState<string>('전체');

  const groupedData: { [key: string]: HabitzHistory[] } = history.reduce(
    (acc: { [key: string]: HabitzHistory[] }, curr) => {
      const date = curr.date.split('T')[0]; // 날짜에서 시간 부분을 제거합니다.
      if (!acc[date]) {
        acc[date] = []; // 해당 날짜의 배열이 없으면 새로 만듭니다.
      }
      acc[date].push(curr); // 해당 날짜의 배열에 데이터를 추가합니다.
      return acc;
    },
    {},
  );

  return (
    <Stack w="full" alignItems={'center'}>
      <Category setCategory={(value: string) => setCategory(value)}></Category>
      <Stack w="full" align="center" gap="1.25rem">
        <Stack w="full">
          <HStack
            w="full"
            justify={'flex-end'}
            textStyle={'headline1.medium'}
            cursor={'pointer'}
          >
            <p>전체 기간</p>
            <IonIcon icon={caretDown} className={css({ fontSize: '1.5rem' })} />
          </HStack>
          <HStack w="full" justify={'space-between'}>
            <p className={css({ textStyle: 'headline1.bold' })}>
              총 <span className={css({ color: 'accent.lime' })}>{123}</span> 건
            </p>
            <p
              className={css({
                textStyle: 'caption1.medium',
                color: 'material.dimmer',
              })}
            >
              {'2023.01.01'}~{'2024.10.11'}
            </p>
          </HStack>
        </Stack>
        <Stack w="full" align="flex-start" gap="0.375rem">
          {Object.keys(groupedData).map((date, dateId) => (
            <Stack key={dateId} w="full" gap="0.375rem" pb="0.75rem">
              <p className={css({ textStyle: 'body2.reading.medium' })}>
                {date.split('-').join('.').slice(5)}
              </p>
              <hr className={css({ color: 'line.alternative' })} />
              {groupedData[date].map((data, id) => (
                <Stack key={id} gap="0.25rem" pb="0.5rem">
                  <HStack
                    w="full"
                    textStyle="label2.medium"
                    color="label.alternative"
                    gap="0.5rem"
                  >
                    <p>{data.date.split('T')[1].substring(0, 5)}</p>
                    <p>{data.nickname}</p>
                  </HStack>
                  <HStack
                    w="full"
                    justify={'space-between'}
                    textStyle={'body1.reading.bold'}
                  >
                    <p>{data.content}</p>
                    <HStack>
                      {data.point > 0 ? (
                        <p className={css({ color: 'accent.lime' })}>
                          + {data.point}
                        </p>
                      ) : (
                        <p>{data.point}</p>
                      )}
                      <Image
                        src="/coin.svg"
                        width={20}
                        height={20}
                        alt="coin"
                      />
                    </HStack>
                  </HStack>
                </Stack>
              ))}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
export default PointHistory;
