'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import Image from 'next/image';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline, trashOutline } from 'ionicons/icons';
import axios from '@/apis/axios';
import { MissionDetailResponse } from '@/types/api/response';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as FileUpload from '@/components/ui/file-upload';
import { IconButton } from '@/components/ui/icon-button';

const AuthenticatePage = ({ params }: { params: { id: string } }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mission = useQuery<MissionDetailResponse>({
    queryKey: ['mission-detail', params.id],
    queryFn: async () => {
      const res = await axios.get<MissionDetailResponse>(
        `/mission/${params.id}`,
      );
      return res.data.data ?? {};
    },
  });
  interface MissionAuthenticateForm {
    content: string;
    image?: string;
  }

  const schema = z.object({
    content: z
      .string()
      .min(5, {
        message: '5자 이상 입력해주세요',
      })
      .max(300, {
        message: '300자 이하로 입력해주세요',
      }),
    image: z
      .any()
      .transform((files) => {
        return files?.[0];
      })
      .refine(
        (file) => (file ? file.size < 1024 * 1024 * 20 : true),
        '20MB 이하의 파일만 업로드 가능합니다',
      )
      .refine(
        (file) => (file ? file.type.includes('image/') : true),
        '이미지 파일만 업로드 가능합니다',
      ),
  });

  const onSubmit: SubmitHandler<MissionAuthenticateForm> = async (data) => {
    const formData = new FormData();

    if (mission.data?.recognition) {
      const res = await axios
        .put<string>(`/mission/${params.id}/perform`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          queryClient.invalidateQueries({
            queryKey: ['mission-detail', params.id],
            exact: true,
          });
          router.push(`/mission/detail/${params.id}`);
        })
        .catch((err) => {
          alert(err.message);
          return;
        });
    } else {
      const res = await axios
        .post<string>(`/mission/${params.id}/perform`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          queryClient.invalidateQueries({
            queryKey: ['mission-detail', params.id],
            exact: true,
          });
          router.push(`/mission/detail/${params.id}`);
        })
        .catch((err) => {
          alert(err.message);
          return;
        });
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<MissionAuthenticateForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: mission.data?.recognition?.content || '',
    },
  });

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        px: '1rem',
        gap: '1.25rem',
      })}
    >
      <header
        className={css({
          display: 'flex',
          position: 'sticky',
          height: '3.75rem',
          top: 0,
          bg: 'transparent',
          backdropFilter: 'auto',
          backdropBlur: 'sm',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <Button
          color="label.alternative"
          variant="link"
          onClick={() => {
            router.back();
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
      <strong
        className={css({
          textStyle: 'title2.bold',
          color: 'label.normal',
        })}
      >
        미션 인증하기
      </strong>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
        })}
      >
        <span
          className={css({
            fontSize: '4.6875rem',
          })}
        >
          {mission.data?.mission.emoji}
        </span>
        <p
          className={css({
            textStyle: 'caption1.medium',
            color: 'label.alternative',
          })}
        >
          {new Date().toISOString().split('T')[0]}
        </p>
        <p
          className={css({
            textStyle: 'title3.bold',
            color: 'label.normal',
          })}
        >
          {mission.data?.mission.title}
        </p>

        {mission.data?.recognition && (
          <div
            className={css({
              display: 'flex',
              flexDir: 'column',
              gap: '1rem',
              mt: '2rem',
            })}
          >
            <p
              className={css({
                textStyle: 'heading2.bold',
                color: 'label.normal',
              })}
            >
              미션 인증 내역
            </p>
            {mission.data.recognition.image && (
              <Image
                src={mission.data.recognition.image}
                alt="recognition image"
                width={300}
                height={200}
                style={{ alignSelf: 'center' }}
              />
            )}
            <p
              className={css({
                textStyle: 'heading2.bold',
                alignSelf: 'flex-start',
                bg: 'background.normal.alternative',
                w: 'full',
                mt: '1rem',
              })}
            >
              {mission.data?.recognition?.content}
            </p>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <FileUpload.Root maxFiles={1} {...register('image')}>
          <FileUpload.Dropzone>
            <FileUpload.Trigger asChild>
              <Button
                type="button"
                size="sm"
                bgColor="primary.normal"
                color="label.normal"
              >
                사진 올리기
              </Button>
            </FileUpload.Trigger>
            <FileUpload.ItemGroup>
              {(files) =>
                files.map((file, id) => (
                  <FileUpload.Item key={id} file={file}>
                    <FileUpload.ItemPreview type="image/*">
                      <FileUpload.ItemPreviewImage />
                    </FileUpload.ItemPreview>
                    <FileUpload.ItemName />
                    <FileUpload.ItemSizeText />
                    <FileUpload.ItemDeleteTrigger asChild>
                      <IconButton variant="link" size="sm">
                        <IonIcon icon={trashOutline} />
                      </IconButton>
                    </FileUpload.ItemDeleteTrigger>
                  </FileUpload.Item>
                ))
              }
            </FileUpload.ItemGroup>
          </FileUpload.Dropzone>
        </FileUpload.Root>
        {errors.image && <span>{errors.image.message}</span>}
        <div
          className={css({
            display: 'flex',
            flexDir: 'column',
            gap: '1rem',
            mt: '1.25rem',
            alignItems: 'center',
          })}
        >
          <input
            {...register('content')}
            type="text"
            id="content"
            placeholder="내용을 입력하세요"
            className={css({
              w: 'full',
              h: '5rem',
              bg: 'background.normal.alternative',
              textStyle: 'body2.normal.medium',
            })}
          />
          {errors.content && (
            <span
              className={css({
                color: 'status.negative',
              })}
            >
              {errors.content.message}
            </span>
          )}
          <Button
            type="submit"
            bgColor="primary.normal"
            color="label.normal"
            w={120}
            shadow={'strong'}
          >
            인증
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthenticatePage;
