import { css } from 'styled-system/css';
import { chevronForwardOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
const KnowledgeItem = ({
  id,
  title,
  contents,
}: {
  id: number;
  title: string;
  contents: string;
}) => {
  const router = useRouter();
  return (
    <article
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
        borderBottom: `1px solid rgba(115, 115, 115, 0.22)`,
        py: '0.625rem',
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          w: 'full',
        })}
      >
        <div
          className={css({
            flexGrow: 1,
            maxWidth: 'calc(100% - 3.125rem)',
          })}
        >
          <span
            className={css({
              textStyle: 'label1.normal.bold',
              color: 'label.normal',
              wordBreak: 'break-word',
            })}
          >
            {title}
          </span>
          <p
            className={css({
              textStyle: 'caption1.medium',
              color: 'label.alternative',
              wordBreak: 'break-word',
              lineClamp: 2,
            })}
          >
            {contents}
          </p>
        </div>
        <Button
          m={2}
          color={'label.alternative'}
          variant={'link'}
          display={'flex'}
          justifyContent={'center'}
          alignSelf={'center'}
          alignItems={'center'}
          onClick={() => {
            router.push(`/quiz/knowledge/${id}`);
          }}
        >
          <IonIcon
            icon={chevronForwardOutline}
            className={css({
              w: '1.5rem',
              h: '1.5rem',
            })}
          />
        </Button>
      </div>
    </article>
  );
};

export default KnowledgeItem;
