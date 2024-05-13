'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import Image from 'next/image';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline, trashOutline } from 'ionicons/icons';
import MissionDetail from '@/components/mission/MissionDetail';
import axios from '@/apis/axios';
import { MissionDetailResponse } from '@/types/api/response';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as FileUpload from '@/components/ui/file-upload';
import { IconButton } from '@/components/ui/icon-button';

const AuthenticatePage = ({ params }: { params: { id: string } }) => {
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

    const res = await axios
      .post<string>(`/mission/${params.id}/perform`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        // console.log(data);
        router.push(`/mission/detail/${params.id}`);
      })
      .catch((err) => {
        alert(err.message);
        return;
      });
  };

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<MissionAuthenticateForm>({
    resolver: zodResolver(schema),
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
          height: '2.5rem',
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
        <input
          {...register('content')}
          type="text"
          id="content"
          placeholder="내용을 입력하세요"
        />
        {errors.content && <span>{errors.content.message}</span>}
        <button type="submit">인증</button>
      </form>
    </div>
  );
};

export default AuthenticatePage;
