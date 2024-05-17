import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';

const DeclineModal = ({
  cancelHandler,
  declineHandler,
}: {
  cancelHandler: () => void;
  declineHandler: (val: string) => void;
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <div
      className={css({
        w: 'full',
        px: '1rem',
        position: 'absolute',
        bottom: '40%',
        left: 0,
      })}
    >
      <Stack
        px="1rem"
        py="1.25rem"
        justify={'space-between'}
        gap="2rem"
        align={'center'}
        w="full"
        minH="300px"
        bg="background.normal.alternative"
        rounded={'1.875rem'}
        border={'1px solid'}
        borderColor={'fill.strong'}
        textStyle={'title3.bold'}
      >
        <p>거절 사유</p>
        <Input
          placeholder="거절 사유를 입력하세요"
          bg="background.elevated.normal"
          rounded="0.875rem"
          border="0"
          minH="full"
          flex="1"
          flexGrow={1}
          alignItems={'flex-start'}
          verticalAlign="top"
          className={css({
            _placeholder: {
              verticalAlign: 'top',
              color: 'label.alternative',
            },
          })}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        ></Input>
        <HStack justify="space-between" w="full">
          <Button
            w="1/2"
            bg="fill.strong"
            color="static.black"
            rounded={'0.875rem'}
            shadow={'md'}
            onClick={cancelHandler}
          >
            취소
          </Button>
          <Button
            w="1/2"
            bg="red.500"
            rounded={'0.875rem'}
            shadow={'md'}
            onClick={() => {
              declineHandler(inputValue);
            }}
          >
            거절
          </Button>
        </HStack>
      </Stack>
    </div>
  );
};
export default DeclineModal;
