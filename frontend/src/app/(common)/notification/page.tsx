'use client';

import { css } from 'styled-system/css';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '@/apis/axios';
import { UserNotification } from '@/types/api/response';
import NotificationCard from '@/components/notification/NotificationCard';
import { useEffect } from 'react';

const Notification = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const notifications = useQuery<UserNotification[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await axios.get<UserNotification[]>('/notification');
      return res.data.data ?? [];
    },
    staleTime: 0,
  });

  const deleteNotification = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete('/notification', {
        data: {
          notificationId: id,
        },
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      }),
  });

  const readAllNotification = useMutation({
    mutationFn: async () => {
      await axios.put('/notification/read-all');
    },
  });

  useEffect(() => {
    return () => {
      readAllNotification.mutate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
          justifyContent: 'flex-start',
          alignItems: 'center',
          zIndex: 9999,
        })}
      >
        <div
          className={css({
            position: 'relative',
            display: 'flex',
            w: 'full',
            h: 'full',
          })}
        >
          <div
            className={css({
              zIndex: '10',
              display: 'flex',
            })}
          >
            <Button
              color="label.alternative"
              variant="link"
              onClick={() => {
                router.push('/');
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
          </div>
          <section
            className={css({
              width: 'full',
              height: 'full',
              left: 0,
              textStyle: 'title3.bold',
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            알림
          </section>
        </div>
      </header>
      <main
        className={css({
          display: 'flex',
          flexDir: 'column',
          w: 'full',
        })}
      >
        {notifications.data &&
          notifications.data.map((notification) => {
            return (
              <NotificationCard
                key={notification.notificationId}
                notification={notification}
                handleDelete={() => {
                  deleteNotification.mutate(notification.notificationId);
                }}
              />
            );
          })}
      </main>
    </>
  );
};

export default Notification;
