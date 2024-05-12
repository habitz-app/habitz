import axios from '@/apis/axios';
import { Button } from '@/components/ui/button';
import { QuizResponse } from '@/types/api/response';
import { useQueryClient } from '@tanstack/react-query';

const QuizButton = ({ option }: { option: string }) => {
  const queryClient = useQueryClient();
  const handleClick = async (option: string) => {
    await axios
      .post<QuizResponse>('/quiz/solve-quiz', {
        answer: option === 'O' ? 'O' : 'X',
      })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ['quiz'],
          exact: true,
        });
      });
  };

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
      onClick={() => handleClick(option)}
    >
      {option === 'O' ? 'O' : 'X'}
    </Button>
  );
};

export default QuizButton;
