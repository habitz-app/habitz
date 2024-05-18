'use client';
import axios from '@/apis/axios';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { IonIcon } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import {
  chevronBackOutline,
  copyOutline,
  checkmarkDoneOutline,
} from 'ionicons/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { css } from 'styled-system/css';

interface FamilyMember {
  memberRole: 'PARENT' | 'CHILD';
  memberId: number;
  name: string;
  uuid: string;
  profileImage: string;
}

interface InviteCode {
  inviteCode: string;
}

const Invite = () => {
  const [icon, setIcon] = useState(copyOutline);
  const [isCopied, setIsCopied] = useState(false);

  const router = useRouter();
  const inviteCode = useQuery({
    queryKey: ['inviteCode'],
    queryFn: async () => {
      const res = await axios.get<InviteCode>('/family/inviteCode');
      console.log(res.data);
      return res.data.data.inviteCode ?? undefined;
    },
  });

  const family = useQuery({
    queryKey: ['family', 'member'],
    queryFn: async () => {
      const res = await axios.get<FamilyMember[]>('/family/memberList');
      console.log(res.data);
      return res.data.data ?? [];
    },
    select: (data) => {
      data.sort((a, b) => {
        const roleA = a.memberRole === 'PARENT' ? 0 : 1;
        const roleB = b.memberRole === 'PARENT' ? 0 : 1;

        if (roleA !== roleB) {
          return roleA - roleB;
        }

        return a.name.localeCompare(b.name);
      });
      return data;
    },
  });

  const handleCopy = () => {
    if (isCopied) return;

    if (!navigator.clipboard) {
      alert('클립보드가 지원되지 않는 브라우저입니다.');
      return;
    }

    if (!inviteCode.data) {
      alert('초대코드를 불러오는 중입니다. 잠시만 기다려주세요.');
      return;
    }

    navigator.clipboard.writeText(inviteCode.data).then(changeCopyIcon);
  };

  const changeCopyIcon = () => {
    setIcon(checkmarkDoneOutline);
    setIsCopied(true);

    setTimeout(() => {
      setIcon(copyOutline);
      setIsCopied(false);
    }, 1500);
  };

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
            우리 가족
          </section>
        </div>
      </header>
      <main
        className={css({
          py: '2.5rem',
          px: '1rem',
        })}
      >
        <section
          className={css({
            display: 'flex',
            flexDir: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mb: '2.5rem',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDir: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            })}
          >
            <span
              className={css({
                textStyle: 'headline1.medium',
              })}
            >
              우리 가족 초대코드
            </span>
            <div
              className={css({
                display: 'flex',
                gap: '0.5rem',
              })}
            >
              <span
                className={css({
                  w: '8rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgColor: 'primary.normal',
                  borderRadius: '0.75rem',
                  textStyle: 'heading2.bold',
                  px: '1rem',
                  h: '2.5rem',
                })}
              >
                {inviteCode.data}
              </span>
              <IconButton
                variant="solid"
                className={css({
                  bgColor: 'primary.normal',
                  rounded: '9999px',
                  _hover: {
                    bgColor: 'primary.strong',
                  },
                  _selected: {
                    bgColor: 'primary.strong',
                  },
                })}
                onClick={handleCopy}
              >
                <IonIcon
                  icon={icon}
                  className={css({
                    color: 'label.normal',
                    fontSize: '1rem',
                  })}
                />
              </IconButton>
            </div>
          </div>
        </section>
        <section
          className={css({
            display: 'flex',
            flexDir: 'column',
          })}
        >
          {family.data &&
            family.data.map((member) => (
              <div
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  borderBottomWidth: '1px',
                  borderBottomColor: 'line.alternative',
                  p: '0.5rem',
                })}
                key={member.uuid}
              >
                <div>
                  <Image
                    src={member.profileImage}
                    alt={member.name}
                    width={50}
                    height={50}
                  />
                </div>
                <span
                  className={css({
                    flex: 1,
                    pl: '0.5rem',
                    textStyle: 'body1.normal.bold',
                  })}
                >
                  {member.name}
                </span>
                {member.memberRole === 'PARENT' ? (
                  <span
                    className={css({
                      bgColor: 'secondary.normal',
                      borderRadius: '0.5rem',
                      borderWidth: '2px',
                      borderColor: 'label.disable',
                      px: '0.5rem',
                      textStyle: 'caption1.bold',
                    })}
                  >
                    부모
                  </span>
                ) : (
                  <span
                    className={css({
                      bgColor: 'primary.normal',
                      borderRadius: '0.5rem',
                      borderWidth: '2px',
                      borderColor: 'label.disable',
                      px: '0.5rem',
                      textStyle: 'caption1.bold',
                    })}
                  >
                    아이
                  </span>
                )}
              </div>
            ))}
        </section>
      </main>
    </>
  );
};

export default Invite;
