'use client';
import Article from '@/components/quiz/Article';
import { css } from 'styled-system/css';
import Image from 'next/image';
import axios from '@/apis/axios';
import { ArticleInfo } from '@/types/api/response';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline, heartOutline } from 'ionicons/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Result = ({ params }: { params: { id: string } }) => {
  const article = useQuery<ArticleInfo>({
    queryKey: [params.id],
    queryFn: async () => {
      const res = await axios.get<ArticleInfo>(`/article/${params.id}`);
      return res.data.data ?? {};
    },
  });
  const router = useRouter();

  return (
    <>
      <header
        className={css({
          display: 'flex',
          position: 'sticky',
          height: '3.75rem',
          top: 0,
          bg: 'transparent',
          backdropFilter: 'auto',
          backdropBlur: 'sm',
          px: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <Button
          color="label.alternative"
          variant="link"
          onClick={() => {
            router.back();
          }}
        >
          <IonIcon
            icon={chevronBackOutline}
            className={css({
              w: '24px',
              h: '24px',
            })}
          />
        </Button>
        <Button color="label.alternative" variant="link">
          <IonIcon
            icon={heartOutline}
            className={css({
              w: '24px',
              h: '24px',
            })}
          />
        </Button>
      </header>
      <div
        className={css({
          h: '250px',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <Image
          src={article.data?.previewImage ?? ''}
          alt="previewImage"
          width={430}
          height={250}
        />
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
        {article.data && (
          <div>
            <Article
              title={article.data.title}
              date={article.data.publishDate}
              contents={article.data.content}
            />
            <Link
              href={article.data.url}
              className={css({
                color: 'blue.500',
                textDecoration: 'underline',
                textStyle: 'caption.normal',
              })}
            >
              원문 보러가기
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Result;
