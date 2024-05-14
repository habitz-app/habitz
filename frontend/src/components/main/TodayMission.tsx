import { Mission } from '@/types/api/response';
import MissionPreview from '../mission/MissionPreview';
import { HStack, Stack } from 'styled-system/jsx';
import { IonIcon } from '@ionic/react';
import { alertCircleOutline, chevronForwardOutline } from 'ionicons/icons';
import { css } from 'styled-system/css';

const TodayMission = ({ missions }: { missions: Mission[] }) => {
  return (
    <Stack p="1.25rem" gap="0.625rem" rounded="0.75rem" shadow="normal">
      <HStack justify="space-between">
        <p className={css({ textStyle: 'title3.bold' })}>오늘의 미션</p>
        <IonIcon
          icon={chevronForwardOutline}
          className={css({ fontSize: '1.5rem' })}
        ></IonIcon>
      </HStack>
      <ul className={css({ textAlign: 'center' })}>
        {missions.length > 0 ? (
          missions.map((mission, id) => (
            <li key={id}>
              <HStack>
                {mission.emoji}
                <MissionPreview
                  missionId={mission.missionId}
                  title={mission.title}
                  status={mission.status}
                />
              </HStack>
            </li>
          ))
        ) : (
          <div className={css({ textStyle: 'label1.normal.regular' })}>
            <IonIcon
              icon={alertCircleOutline}
              className={css({ fontSize: '6.25rem' })}
            />
            <p>할당된 미션이 없어요!</p>
            <p>새로운 미션을 등록해보세요</p>
          </div>
        )}
      </ul>
    </Stack>
  );
};
export default TodayMission;
