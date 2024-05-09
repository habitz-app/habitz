'use client';
import { Button } from '@/components/ui/button';
import { css } from 'styled-system/css';
import Image from 'next/image';
import MissionContent from '@/components/mission/MissionContent';
const MissionPage = () => {
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
          <Image
            key="history"
            src="/history.svg"
            alt="history"
            width="19"
            height="19"
          ></Image>
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
          미션
        </span>
        <p
          className={css({
            textStyle: 'title3.bold',
            color: 'label.normal',
          })}
        >
          진행 중
        </p>
        <MissionContent
          title="아침 인사 하기"
          emoji="😊"
          point={100}
          status={'EMPTY'}
          missionId={1}
        />
        <MissionContent
          title="책상 정리 하기"
          emoji="📚"
          point={1000}
          status={'EMPTY'}
          missionId={2}
        />
        <MissionContent
          title="일기 쓰기"
          emoji="📒"
          point={300}
          status={'EMPTY'}
          missionId={3}
        />

        <p
          className={css({
            textStyle: 'title3.bold',
            color: 'label.normal',
          })}
        >
          완료
        </p>
        <div className={css({})}>
          <section
            className={css({
              display: 'flex',
              gap: '0.75rem',
              overflowX: 'auto',
            })}
          >
            <MissionContent
              title="아침 인사 하기"
              emoji="😊"
              point={100}
              status={'ACCEPT'}
              missionId={1}
            />
            <MissionContent
              title="책상 정리 하기"
              emoji="📚"
              point={1000}
              status={'ACCEPT'}
              missionId={2}
            />
            <MissionContent
              title="일기 쓰기"
              emoji="📒"
              point={300}
              status={'ACCEPT'}
              missionId={3}
            />
            <MissionContent
              title="아침 인사 하기"
              emoji="😊"
              point={100}
              status={'ACCEPT'}
              missionId={4}
            />
            <MissionContent
              title="책상 정리 하기"
              emoji="📚"
              point={1000}
              status={'ACCEPT'}
              missionId={5}
            />
            <MissionContent
              title="일기 쓰기"
              emoji="📒"
              point={300}
              status={'ACCEPT'}
              missionId={6}
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default MissionPage;
