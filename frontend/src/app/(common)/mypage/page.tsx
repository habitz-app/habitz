'use client';

import { useMe } from '@/hooks/useAuth';
import { css } from 'styled-system/css';
import Image from 'next/image';
import { FormLabel } from '@/components/ui/form-label';
import { Input, type InputProps } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline, pencilOutline } from 'ionicons/icons';
import { IconButton, type IconButtonProps } from '@/components/ui/icon-button';
import axios from '@/apis/axios';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const me = useMe(); // Custom hook to fetch user data
  const [isLoaded, setIsLoaded] = useState(false);

  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState<string>(''); // [1
  const [isEditing, setIsEditing] = useState(false);
  const name = me.data?.name;
  const email = me.data?.email;
  const birth = me.data?.birthDate;
  const role = me.data?.role;
  const [imgFile, setImgFile] = useState<File | null>(null); // [2
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setImgFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result && typeof result === 'string') {
          setProfileImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('image', imgFile ?? '');
    const res = await axios.patch<string>(`/member/edit`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res.status === 200) {
      setIsEditing(false);
    }
  };

  // Update name state when user data is loaded
  useEffect(() => {
    if (me.data) {
      setNickname(me.data.nickName ?? ''); // Set the nickname state
      setProfileImage(me.data.profileImage ?? ''); // [1
      setIsLoaded(true); // Set the loaded state
    }
  }, [me.data]);

  const router = useRouter();

  return (
    <>
      <div>
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
                  router.push('/more');
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
              내 정보
            </section>
          </div>
        </header>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem',
          })}
        >
          <div
            className={css({
              p: '1rem',
              position: 'relative',
            })}
          >
            <Image
              src={profileImage}
              width={100}
              height={100}
              alt={`${me.data?.name ?? ''}의 프로필`}
              className={css({
                borderRadius: '50%',
                boxShadow: 'strong',
              })}
            />
            {!isEditing && (
              <IconButton
                aria-label="Next Page"
                variant="solid"
                bg="primary.normal"
                color="label.normal"
                position="absolute"
                right="0"
                top="6rem"
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              >
                <IonIcon
                  icon={pencilOutline}
                  className={css({
                    w: '24px',
                    h: '24px',
                  })}
                />
              </IconButton>
            )}
          </div>
          {isEditing && (
            <div
              className={css({
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
              })}
            >
              <Button
                className={css({
                  bg: 'primary.heavy',
                })}
                size="sm"
                onClick={() => {
                  document.getElementById('file-input')?.click();
                }}
              >
                이미지 업로드
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                취소
              </Button>
            </div>
          )}
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
            gap: '1rem',
          })}
        >
          <div
            className={css({
              gap: '0.5rem',
            })}
          >
            <FormLabel htmlFor="name">이름</FormLabel>
            <Input id="nickname" placeholder="이름" value={name} disabled />
          </div>
          <div>
            <FormLabel htmlFor="name">닉네임</FormLabel>
            {isLoaded && (
              <Input
                id="nickname"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={!isEditing}
              />
            )}
          </div>
          <div>
            <FormLabel htmlFor="name">이메일</FormLabel>
            <Input id="nickname" placeholder="이메일" value={email} disabled />
          </div>
          {isEditing && (
            <Button
              className={css({
                bg: 'primary.heavy',
                width: '100%',
                height: '3rem',
                borderRadius: '0.5rem',
                mt: '2rem',
              })}
              onClick={() => {
                onSubmit();
              }}
            >
              저장하기
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
