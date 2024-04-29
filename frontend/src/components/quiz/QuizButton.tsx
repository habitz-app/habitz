import { Button } from '@/components/ui/button';

const QuizButton = ({ option }: { option: boolean }) => {
  return (
    <Button
      variant={'solid'}
      size={'lg'}
      bg={option ? 'blue.500' : 'red.500'}
      w={'full'}
      h={'3rem'}
      borderRadius={'0.5rem'}
      textStyle={'title3.bold'}
      shadow={'emphasize'}
    >
      {option ? 'O' : 'X'}
    </Button>
  );
};

export default QuizButton;
