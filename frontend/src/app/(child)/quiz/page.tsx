'use client';
import KnowledgeTab from '@/components/quiz/KnowledgeTab';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import { Button } from '@/components/ui/button';
import { ArticleResponse, QuizResponse } from '@/types/api/response';
import { IonIcon } from '@ionic/react';
import axios from '@/apis/axios';
import { heart } from 'ionicons/icons';
import { css } from 'styled-system/css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const Quiz = () => {
  const router = useRouter();

  const todayQuiz = useQuery<QuizResponse>({
    queryKey: ['quiz'],
    queryFn: async () => {
      const res = await axios.get<QuizResponse>('/quiz/today-quiz');
      return res.data.data ?? {};
    },
  });

  const article = useQuery<ArticleResponse>({
    queryKey: ['article'],
    queryFn: async () => {
      const res = await axios.get<ArticleResponse>('/article/list');
      return res.data.data ?? {};
    },
  });

  const queryClient = useQueryClient();
  const solve = async (option: string) => {
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
        <QuizQuestion
          correct={todayQuiz.data?.quizHistoryInfo?.correct || false}
          isSolved={todayQuiz.data?.isSolved || false}
          content={todayQuiz.data?.quizInfo.content || ''}
          handleClick={() => {
            router.push(
              `/quiz/knowledge/${todayQuiz.data?.quizHistoryInfo?.articleId || 0}`,
            );
          }}
          solveQuiz={solve}
        />
        <KnowledgeTab
          options={[
            {
              id: 'lifeCategory',
              label: '생활/습관',
              items: article.data?.lifeCategory || [],
            },
            {
              id: 'financeCategory',
              label: '금융/재테크',
              items: article.data?.financeCategory || [],
            },
            {
              id: 'defaultCategory',
              label: '기타',
              items: article.data?.defaultCategory || [],
            },
          ]}
        />
      </div>
    </>
  );
};

export default Quiz;
