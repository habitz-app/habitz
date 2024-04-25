'use client';

import { css } from 'styled-system/css';
import { home, bulb, star, storefront, grid } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { useState } from 'react';
const ChildTabBar = () => {
  const [isActive, setIsActive] = useState({
    home: true,
    quiz: false,
    mission: false,
    store: false,
    menu: false,
  });

  const handleClick = (menu: string) => {
    setIsActive((prevState) => ({
      ...prevState,
      home: menu === 'home',
      quiz: menu === 'quiz',
      mission: menu === 'mission',
      store: menu === 'store',
      menu: menu === 'menu',
    }));
  };

  return (
    <nav
      className={css({
        w: 'full',
        h: '5rem',
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
      })}
    >
      <ul
        className={css({
          display: 'flex',
          flexDir: 'row',
          alignItems: 'center',
          px: '1rem',
          h: '5rem',
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
            color: isActive.home ? 'label.normal' : 'label.alternative',
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
          onClick={() => handleClick('quiz')}
          className={css({
            display: 'flex',
            w: 'full',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDir: 'column',
            flexGrow: 1,
            color: isActive.quiz ? 'label.normal' : 'label.alternative',
          })}
        >
          <IonIcon
            icon={bulb}
            className={css({
              h: '1.5rem',
              w: '1.5rem',
            })}
          />
          <span className={css({ fontSize: '0.75rem' })}>퀴즈</span>
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
            color: isActive.mission ? 'label.normal' : 'label.alternative',
          })}
        >
          <IonIcon
            icon={star}
            className={css({
              h: '1.5rem',
              w: '1.5rem',
            })}
          />
          <span className={css({ fontSize: '0.75rem' })}>미션</span>
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
            color: isActive.store ? 'label.normal' : 'label.alternative',
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
          onClick={() => handleClick('menu')}
          className={css({
            display: 'flex',
            w: 'full',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDir: 'column',
            flexGrow: 1,
            color: isActive.menu ? 'label.normal' : 'label.alternative',
          })}
        >
          <IonIcon
            icon={grid}
            className={css({
              h: '1.5rem',
              w: '1.5rem',
            })}
          />
          <span className={css({ fontSize: '0.75rem' })}>메뉴</span>
        </li>
      </ul>
    </nav>
  );
};

export default ChildTabBar;
