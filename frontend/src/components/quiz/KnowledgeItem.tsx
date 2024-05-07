import { css } from 'styled-system/css';
import { heartOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { Button } from '@/components/ui/button';
const KnowledgeItem = ({
  title,
  contents,
}: {
  title: string;
  contents: string;
}) => {
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
        >
          <IonIcon
            icon={heartOutline}
            className={css({
              w: '2.5rem',
              h: '2.5rem',
            })}
          />
        </Button>
      </div>
    </article>
  );
};

export default KnowledgeItem;
