'use client';
import * as Card from '@/components/ui/card';
import QuizButton from '@/components/quiz/QuizButton';
import { Player } from '@lottiefiles/react-lottie-player';
import { css } from 'styled-system/css';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
const QuizQuestion = ({
  isSolved,
  content,
}: {
  isSolved: boolean;
  content: string;
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/quiz/result');
  };
  return (
    <div>
      {isSolved ? (
        <Card.Root bg="background.elevated.normal">
          <Card.Header
            py={'0.75rem'}
            px={'1rem'}
            display="flex"
            flexDir="row"
            gap="12px"
            paddingX="20px"
          >
            <Player
              autoplay
              loop
              src="/question-mark.json"
              style={{
                height: '50px',
                width: '50px',
              }}
            />
            <div
              className={css({
                display: 'flex',
                flexDir: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: 'full',
              })}
            >
              <Card.Description
                color={'primary.heavy'}
                textStyle={'label1.normal.bold'}
              >
                매일매일 푸는 퀴즈
              </Card.Description>
              <Card.Title
                textStyle={'body1.normal.bold'}
                color={'label.strong'}
              >
                정답을 맞췄어요!
              </Card.Title>
            </div>
            <Button
              variant="solid"
              size="sm"
              bg="primary.normal"
              color="label.neutral"
              display="flex"
              justifyContent="center"
              alignItems="center"
              alignSelf="center"
              textStyle="caption2.bold"
              onClick={handleClick}
            >
              자세히
            </Button>
          </Card.Header>
        </Card.Root>
      ) : (
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
      )}
    </div>
  );
};

export default QuizQuestion;
