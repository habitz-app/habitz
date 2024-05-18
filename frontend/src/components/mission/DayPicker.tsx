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
  isDisabled,
}: {
  day: string;
  isSelected: boolean;
  handleClick: () => void;
  isDisabled: boolean;
}) => {
  return (
    <HStack
      textStyle={'heading1.bold'}
      color={isDisabled ? 'label.alternative' : 'initial'}
    >
      <button
        onClick={handleClick}
        className={button({ selected: isSelected })}
        disabled={isDisabled}
      >
        {day}
      </button>
    </HStack>
  );
};

const DayPicker = ({
  weekDays,
  setWeekDays,
  dayFilter,
}: {
  weekDays: boolean[];
  setWeekDays: Dispatch<React.SetStateAction<boolean[]>>;
  dayFilter: boolean[];
}) => {
  const daysString = ['월', '화', '수', '목', '금', '토', '일'];
  const handleClick = (index: number) => {
    const newDays = [...weekDays];
    newDays[index] = !newDays[index];
    setWeekDays(newDays);
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
          isDisabled={!dayFilter[index]}
        />
      ))}
    </HStack>
  );
};
export default DayPicker;
