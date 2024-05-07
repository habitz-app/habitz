'use client';
import KnowledgeTab from '@/components/quiz/KnowledgeTab';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import { Button } from '@/components/ui/button';
import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';
import { css } from 'styled-system/css';

const Quiz = () => {
  return (
    <>
      <header
        className={css({
          display: 'flex',
          position: 'sticky',
          height: '2.5rem',
          top: 0,
          bg: 'background.normal.normal/80',
          backdropFilter: 'auto',
          backdropBlur: 'sm',
          px: '1rem',
          justifyContent: 'flex-end',
          alignItems: 'center',
        })}
      >
        <Button color="label.alternative" variant="link">
          <IonIcon
            icon={heart}
            className={css({
              w: '24px',
              h: '24px',
            })}
          />
        </Button>
      </header>
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
        <QuizQuestion isSolved={true} content={'딸기는 과일이다?'} />
        <KnowledgeTab />
      </div>
    </>
  );
};

export default Quiz;
