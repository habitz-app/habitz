'use client';
import KnowledgeTab from '@/components/quiz/KnowledgeTab';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import { css } from 'styled-system/css';

const Quiz = ({ content }: { content: string }) => {
  return (
    <div
      className={css({
        display: 'flex',
        w: 'full',
        flexDir: 'column',
        gap: '1rem',
        px: '1rem',
      })}
    >
      <span
        className={css({ textStyle: 'title2.bold', color: 'label.normal' })}
      >
        오늘의 생활 지식
      </span>
      <QuizQuestion content={'딸기는 과일이다?'} />
      <KnowledgeTab />
    </div>
  );
};

export default Quiz;
