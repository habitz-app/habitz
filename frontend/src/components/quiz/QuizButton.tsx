import { Button } from '@/components/ui/button';
import { MouseEventHandler } from 'react';
const QuizButton = ({
  option,
  handleClick,
}: {
  option: string;
  handleClick: MouseEventHandler;
}) => {
  return (
    <Button
      variant={'solid'}
      size={'lg'}
      bg={option === 'O' ? 'blue.500' : 'red.500'}
      w={'full'}
      h={'3rem'}
      borderRadius={'0.5rem'}
      textStyle={'title3.bold'}
      shadow={'emphasize'}
      onClick={handleClick}
    >
      {option === 'O' ? 'O' : 'X'}
    </Button>
  );
};

export default QuizButton;
