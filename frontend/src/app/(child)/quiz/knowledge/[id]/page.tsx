'use client';
import Article from '@/components/quiz/Article';
import QuizResult from '@/components/quiz/QuizResult';
import { css } from 'styled-system/css';
import Image from 'next/image';
import axios from '@/apis/axios';
import { ArticleInfo } from '@/types/api/response';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const Result = ({ params }: { params: { id: string } }) => {
  const article = useQuery<ArticleInfo>({
    queryKey: [params.id],
    queryFn: async () => {
      const res = await axios.get<ArticleInfo>(`/article/${params.id}`);
      return res.data.data ?? {};
    },
  });

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
          title={article.data?.title || ''}
          date={new Date().toLocaleDateString()}
          contents={article.data?.content || ''}
        />
      </div>
    </>
  );
};

export default Result;
