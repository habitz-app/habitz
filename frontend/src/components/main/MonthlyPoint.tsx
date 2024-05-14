import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import Image from 'next/image';
import { Button } from '../ui/button';
import { circle } from 'styled-system/patterns';
const MonthlyPoint = ({
  month,
  point,
  clickHandler,
}: {
  month: number;
  point: number;
  clickHandler: () => void;
}) => {
  return (
    <HStack
      px="1.25rem"
      py="0.75rem"
      gap="0.75rem"
      justify="space-between"
      shadow="normal"
      rounded="0.75rem"
    >
      <HStack>
        <div
          className={circle({
            overflow: 'hidden',
            w: '3.125rem',
            h: '3.125rem',
            position: 'relative',
            bg: 'red.400',
          })}
        >
          <Image
            alt="monthlyPoint"
            src="https://th.bing.com/th/id/OIG4.SGHvuHUdKia0nE_KPMCp?w=1024&h=1024&rs=1&pid=ImgDetMain"
            fill
          ></Image>
        </div>
        <Stack gap={0}>
          <p
            className={css({
              textStyle: 'caption1.bold',
              color: 'primary.heavy',
            })}
          >
            {month}월에 번 포인트
          </p>
          <HStack gap={0} textStyle={'body1.normal.strong'}>
            <span>{point}</span>
            <Image
              src="/coin.svg"
              width={20}
              height={20}
              className={css({
                ml: '0.2rem',
              })}
              alt="coin"
            />
          </HStack>
        </Stack>
      </HStack>
      <Button
        bg="lime.300"
        textStyle="caption2.bold"
        color="label.neutral"
        shadow="normal"
        onClick={clickHandler}
        rounded="0.25rem"
      >
        내역
      </Button>
    </HStack>
  );
};
export default MonthlyPoint;
