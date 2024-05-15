import { ChildRecentHistoryResponse } from '@/types/api/response';
import { IonIcon } from '@ionic/react';
import { alertCircleOutline, chevronForwardOutline } from 'ionicons/icons';
import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import { IconButton } from '../ui/icon-button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const RecentHistory = ({
  history,
  uuid,
}: {
  history: ChildRecentHistoryResponse;
  uuid: string;
}) => {
  const router = useRouter();
  return (
    <Stack p="1.25rem" gap="0.625rem" rounded="0.75rem" shadow="normal">
      <HStack justify="space-between">
        <p className={css({ textStyle: 'title3.bold' })}>최근 활동</p>
        <IconButton
          variant="ghost"
          onClick={() => {
            router.push('/manage/');
          }}
        >
          <IonIcon
            icon={chevronForwardOutline}
            className={css({ fontSize: '1.5rem' })}
          ></IonIcon>
        </IconButton>
      </HStack>
      <ul className={css({ textAlign: 'center', textStyle: 'headline1.bold' })}>
        {history.map((history, id) => (
          <li key={id}>
            <HStack w="full" justify="space-between">
              <p>{history.historyInfo.content}</p>
              {history.historyInfo.point > 0 ? (
                <HStack>
                  <p className={css({ color: 'accent.lime' })}>
                    +{history.historyInfo.point}
                  </p>
                  <Image src="/coin.svg" alt="coin" width={20} height={20} />
                </HStack>
              ) : (
                <HStack>
                  <p className={css({ color: 'status.negative' })}>
                    {history.historyInfo.point}
                  </p>
                  <Image src="/coin.svg" alt="coin" width={20} height={20} />
                </HStack>
              )}
            </HStack>
          </li>
        ))}
      </ul>
    </Stack>
  );
};
export default RecentHistory;
