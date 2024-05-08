import { Dispatch, useState } from 'react';
import { css, cva } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

const button = cva({
  base: {
    w: '2rem',
    h: '2rem',
    rounded: '9999px',
    textAlign: 'center',
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
  },
  variants: {
    selected: {
      true: {
        bg: '#965EC7',
        color: 'white',
      },
      false: {
        bg: 'transparent',
      },
    },
  },
});

const Day = ({
  day,
  isSelected,
  handleClick,
}: {
  day: string;
  isSelected: boolean;
  handleClick: () => void;
}) => {
  return (
    <HStack>
      <button
        onClick={handleClick}
        className={button({ selected: isSelected })}
      >
        {day}
      </button>
    </HStack>
  );
};

const DayPicker = ({
  weekDays,
  setWeekDays,
}: {
  weekDays: boolean[];
  setWeekDays: Dispatch<React.SetStateAction<boolean[]>>;
}) => {
  const daysString = ['월', '화', '수', '목', '금', '토', '일'];
  const handleClick = (index: number) => {
    const newDays = [...weekDays];
    newDays[index] = !newDays[index];
    setWeekDays(newDays);
    console.log(index, 'to', newDays[index]);
  };
  return (
    <HStack
      w="full"
      h="60px"
      fontSize={'18px'}
      justify="space-between"
      px="3"
      bg="neutral.200"
      rounded={'10'}
    >
      {weekDays.map((weekDay, index) => (
        <Day
          key={index}
          day={daysString[index]}
          isSelected={weekDay}
          handleClick={() => handleClick(index)}
        />
      ))}
    </HStack>
  );
};
export default DayPicker;
