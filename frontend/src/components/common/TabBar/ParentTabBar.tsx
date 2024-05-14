'use client';

import { css } from 'styled-system/css';
import { home, people, star, storefront, grid } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { useEffect, useState } from 'react';
import type { MenuType } from '@/types/tabBar/parentTabBar';
import { useRouter } from 'next/navigation';

const ParentTabBar = ({ menu }: { menu: MenuType }) => {
  const [currentMenu, setCurrentMenu] = useState(menu);
  const router = useRouter();

  useEffect(() => {
    setCurrentMenu(menu);
  }, [menu]);

  const handleClick = (menu: MenuType) => {
    const routes = {
      home: '/',
      child: '/manage/child',
      mission: '/manage/mission',
      store: '/manage/store',
      more: '/more',
    };

    router.push(routes[menu]);
    setCurrentMenu(menu);
  };

  return (
    <nav
      className={css({
        w: 'full',
        h: '5rem',
        position: 'sticky',
        bottom: '0',
        bg: 'background.normal.normal/80',
        backdropFilter: 'auto',
        backdropBlur: 'sm',
      })}
    >
      <ul
        className={css({
          display: 'flex',
          flexDir: 'row',
          alignItems: 'center',
          px: '1rem',
          h: '5rem',
          textStyle: 'caption1.regular',
        })}
      >
        <li
          onClick={() => handleClick('home')}
          className={css({
            display: 'flex',
            w: 'full',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDir: 'column',
            flexGrow: 1,
            color:
              currentMenu === 'home' ? 'label.normal' : 'label.alternative',
          })}
        >
          <IonIcon
            icon={home}
            className={css({
              h: '1.5rem',
              w: '1.5rem',
            })}
          />
          <span className={css({ fontSize: '0.75rem' })}>홈</span>
        </li>
        <li
          onClick={() => handleClick('child')}
          className={css({
            display: 'flex',
            w: 'full',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDir: 'column',
            flexGrow: 1,
            color:
              currentMenu === 'child' ? 'label.normal' : 'label.alternative',
          })}
        >
          <IonIcon
            icon={people}
            className={css({
              h: '1.5rem',
              w: '1.5rem',
            })}
          />
          <span className={css({ fontSize: '0.75rem' })}>자녀관리</span>
        </li>
        <li
          onClick={() => handleClick('mission')}
          className={css({
            display: 'flex',
            w: 'full',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDir: 'column',
            flexGrow: 1,
            color:
              currentMenu === 'mission' ? 'label.normal' : 'label.alternative',
          })}
        >
          <IonIcon
            icon={star}
            className={css({
              h: '1.5rem',
              w: '1.5rem',
            })}
          />
          <span className={css({ fontSize: '0.75rem' })}>미션관리</span>
        </li>
        <li
          onClick={() => handleClick('store')}
          className={css({
            display: 'flex',
            w: 'full',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDir: 'column',
            flexGrow: 1,
            color:
              currentMenu === 'store' ? 'label.normal' : 'label.alternative',
          })}
        >
          <IonIcon
            icon={storefront}
            className={css({
              h: '1.5rem',
              w: '1.5rem',
            })}
          />
          <span className={css({ fontSize: '0.75rem' })}>상점</span>
        </li>
        <li
          onClick={() => handleClick('more')}
          className={css({
            display: 'flex',
            w: 'full',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDir: 'column',
            flexGrow: 1,
            color:
              currentMenu === 'more' ? 'label.normal' : 'label.alternative',
          })}
        >
          <IonIcon
            icon={grid}
            className={css({
              h: '1.5rem',
              w: '1.5rem',
            })}
          />
          <span className={css({ fontSize: '0.75rem' })}>더보기</span>
        </li>
      </ul>
    </nav>
  );
};

export default ParentTabBar;
