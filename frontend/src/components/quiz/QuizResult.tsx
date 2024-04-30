import { Button } from '@/components/ui/button';
import Image from 'next/image';

const QuizResult = ({
  isCorrect,
  points,
}: {
  isCorrect: boolean;
  points?: number;
}) => {
  return (
    <Button
      w={'full'}
      p={'0.625rem'}
      borderRadius={'0.75rem'}
      shadow={'strong'}
      gap={0.5}
      textStyle={'label1.normal.bold'}
      bg={isCorrect ? 'status.positive' : 'status.negative'}
      color={isCorrect ? 'label.normal' : 'static.white'}
    >
      {isCorrect
        ? [
            '와우! 정답을 맞췄어요! ',
            points,
            <Image
              key="image"
              src="/coin.svg"
              width={20}
              height={20}
              alt="coin"
            />,
            '를 받았어요.',
          ]
        : '이런 틀렸어요! 왜 틀렸는지 알아볼까요?'}
    </Button>
  );
};

export default QuizResult;
