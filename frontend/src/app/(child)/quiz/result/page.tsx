import Article from '@/components/quiz/Article';
import QuizResult from '@/components/quiz/QuizResult';
import { css } from 'styled-system/css';
import Image from 'next/image';

const article = {
  title: '새콤달콤한 딸기가 채소라고? 과일과 채소의 기준이 뭘까?',
  date: new Date().toLocaleDateString(),
  contents: '',
};
const Result = () => {
  return (
    <>
      <div
        className={css({
          bg: 'accent.pink',
          h: '250px',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <Image src="/character.svg" alt="character" width="100" height="100" />
      </div>
      <div
        className={css({
          display: 'flex',
          w: 'full',
          flexDir: 'column',
          gap: '1rem',
          px: '1rem',
          py: '20px',
        })}
      >
        <QuizResult isCorrect={true} />
        <Article
          title={article.title}
          date={new Date().toLocaleDateString()}
          contents={''}
        />
      </div>
    </>
  );
};

export default Result;
