import { css } from 'styled-system/css';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { IonIcon } from '@ionic/react';
import { addOutline, chevronBackOutline, notifications } from 'ionicons/icons';
import Link from 'next/link';
import { HStack } from 'styled-system/jsx';

const Header = ({
  isMission,
  uuid,
  isBack,
}: {
  isMission?: boolean;
  uuid?: string;
  isBack?: boolean;
}) => {
  const router = useRouter();

  if (isBack) {
    return (
      <header
        className={css({
          display: 'flex',
          position: 'sticky',
          height: '3.75rem',
          top: 0,
          bg: 'background.normal.normal/80',
          backdropFilter: 'auto',
          backdropBlur: 'sm',
          px: '1rem',
          justifyContent: 'space-between',
          alignItems: 'end',
        })}
      >
        <HStack h="2.5rem">
          <Button
            variant="link"
            h="3.75rem"
            onClick={() => {
              router.back();
            }}
          >
            <IonIcon
              icon={chevronBackOutline}
              className={css({
                fontSize: '1.5rem',
                color: 'label.alternative',
              })}
            ></IonIcon>
          </Button>
        </HStack>
      </header>
    );
  }
  return (
    <header
      className={css({
        display: 'flex',
        position: 'sticky',
        height: '3.75rem',
        top: 0,
        bg: 'background.normal.normal/80',
        backdropFilter: 'auto',
        backdropBlur: 'sm',
        px: '1rem',
        justifyContent: 'space-between',
        alignItems: 'end',
      })}
    >
      <Link
        className={css({
          fontFamily: 'yeoljeong',
          fontSize: '28px',
          lineHeight: '38.02px',
          color: 'label.alternative',
        })}
        href={'/'}
      >
        habitz
      </Link>
      <div
        className={css({ h: '38.02px', display: 'flex', alignItems: 'center' })}
      >
        <Button
          color="label.alternative"
          variant="link"
          h="3.75rem"
          onClick={() => {
            // router.push('/manage/mission/create/');
          }}
        >
          {isMission ? (
            <IonIcon
              icon={addOutline}
              className={css({ fontSize: '1.5rem', color: '#000000' })}
            />
          ) : (
            <Button color="label.alternative" variant="link">
              <IonIcon
                icon={notifications}
                className={css({
                  w: '24px',
                  h: '24px',
                })}
              />
            </Button>
          )}
        </Button>
      </div>
    </header>
  );
};
export default Header;
