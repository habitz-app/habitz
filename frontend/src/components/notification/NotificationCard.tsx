import { NotificationType, UserNotification } from '@/types/api/response';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { MouseEventHandler } from 'react';
import { css } from 'styled-system/css';

const notificationIcon: { [key in NotificationType]: string } = {
  MISSION_SUBMIT: '📝',
  MISSION_CONFIRM: '👓',
  MISSION_DECLINE: '❌',
  MISSION_ACCEPT: '✅',
  MISSION_ARRIVED: '💌',
  ITEM_BUYING: '🛒',
  POINT_CHARGE: '💳',
  SYSTEM: '📢',
};

interface NotificationCardProps {
  notification: UserNotification;
  handleDelete: MouseEventHandler<HTMLButtonElement>;
}

const NotificationCard = ({
  notification,
  handleDelete,
}: NotificationCardProps) => {
  return (
    <article
      className={css({
        display: 'flex',
        px: '1rem',
        py: '0.625rem',
        bgColor: notification.read ? 'inherit' : 'primary.normal/40',
        '&:not(:last-child)': {
          borderBottom: '1px solid',
          borderColor: 'line.normal',
        },
      })}
    >
      <section
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          m: '1rem',
          w: '1.5rem',
        })}
      >
        {notificationIcon[notification.type]}
      </section>
      <section
        className={css({
          display: 'flex',
          flex: 1,
          w: 'full',
          flexDir: 'column',
        })}
      >
        <section
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            w: 'full',
          })}
        >
          <span
            className={css({
              textStyle: 'caption1.bold',
              color: 'secondary.heavy',
            })}
          >
            {notification.title}
          </span>
          <span
            className={css({
              textStyle: 'caption1.regular',
              color: 'label.alternative',
            })}
          >
            {notification.createdAt.replace('T', ' ')}
          </span>
        </section>
        <p
          className={css({
            textStyle: 'body2.normal.regular',
            w: 'full',
            wordBreak: 'break-word',
            textOverflow: 'ellipsis',
            lineClamp: 2,
          })}
        >
          {notification.content}
        </p>
      </section>
      <section
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'label.alternative',
        })}
      >
        <button
          onClick={handleDelete}
          className={css({
            cursor: 'pointer',
          })}
        >
          <IonIcon
            icon={closeOutline}
            className={css({
              w: '1rem',
              p: '1rem',
            })}
          />
        </button>
      </section>
    </article>
  );
};

export default NotificationCard;
