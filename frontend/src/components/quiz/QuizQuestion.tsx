import * as Card from '@/components/ui/card';
import QuizButton from '@/components/quiz/QuizButton';
import { Player } from '@lottiefiles/react-lottie-player';
const QuizQuestion = ({ content }: { content: string }) => {
  return (
    <div>
      <Card.Root bg={'background.elevated.normal'} position="static">
        <Card.Header
          py={'2.5rem'}
          px={'1rem'}
          display={'flex'}
          justifyContent={'center'}
        >
          <Card.Description
            color={'primary.heavy'}
            textStyle={'label1.normal.bold'}
          >
            매일매일 푸는 퀴즈
          </Card.Description>
          <Card.Title textStyle={'title3.bold'} color={'label.strong'}>
            {content}
          </Card.Title>
        </Card.Header>
        <Card.Body
          w={'full'}
          px={'1rem'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Player
            autoplay
            loop
            src="/question-mark.json"
            style={{ height: '150px', width: '150px' }}
          ></Player>
        </Card.Body>
        <Card.Footer
          display={'flex'}
          pt={'2.5rem'}
          alignItems={'center'}
          gap={'0.5rem'}
        >
          <QuizButton option={true} />
          <QuizButton option={false} />
        </Card.Footer>
      </Card.Root>
    </div>
  );
};

export default QuizQuestion;
