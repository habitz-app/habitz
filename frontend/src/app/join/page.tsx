'use client';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import { useAuthWithRoles } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { MemberResponse } from '@/types/api/response';
import axios from '@/apis/axios';
import { useRouter } from 'next/navigation';

const MEMBER_ROLE = z.enum(['PARENT', 'CHILD']);

interface JoinForm {
  memberRole: z.infer<typeof MEMBER_ROLE>;
  nickname: string;
  familyId?: string;
}

const schema = z.object({
  memberRole: MEMBER_ROLE,
  nickname: z
    .string()
    .min(2, { message: '닉네임이 너무 짧아요. 두 글자 이상 입력해주세요!' })
    .max(16, { message: '닉네임이 너무 길어요. 16글자 이하로 입력해주세요!' }),
  familyId: z.string().optional(),
});

const Join = () => {
  useAuthWithRoles(['GUEST']);
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<MemberResponse>(['me']);
  const router = useRouter();

  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<JoinForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<JoinForm> = async (data) => {
    if (step !== 3) {
      return;
    }
    const res = await axios
      .post<MemberResponse>('/member/join', data)
      .catch((err) => {
        alert(err.response.data.message);
        return;
      });

    router.push('/invite');
  };

  const handleClickType = (type: z.infer<typeof MEMBER_ROLE>) => {
    setValue('memberRole', type);
    setStep(2);
  };

  const handleNextStep = async () => {
    const isValid = await trigger('nickname').then((res) => res);
    if (isValid) {
      setStep(3);
    }
  };

  const goPreviousStep = () => {
    // step가 1보다 크면 step를 1 감소
    setStep(step === 1 ? 1 : step - 1);
  };

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
          {step !== 1 && (
            <div
              className={css({
                zIndex: '10',
                display: 'flex',
              })}
            >
              <Button
                color="label.alternative"
                variant="link"
                onClick={goPreviousStep}
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
          )}
          <section
            className={css({
              width: 'full',
              height: '2.5rem',
              left: 0,
              textStyle: 'title3.bold',
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            회원가입
          </section>
        </div>
      </header>
      <div
        className={css({
          px: '1rem',
          py: '2rem',
          display: 'flex',
          flexDir: 'column',
          h: 'calc(100vh - 2.5rem)',
        })}
      >
        <form
          className={css({
            display: 'flex',
            flexDir: 'column',
            flexGrow: 1,
            pt: '2rem',
            gap: '1.5rem',
          })}
          onSubmit={handleSubmit(onSubmit)}
        >
          {step === 1 && (
            <>
              <div
                className={css({
                  textStyle: 'heading1.bold',
                })}
              >
                안녕하세요! <br />
                미션 깨고, 포인트 벌어볼까요?
              </div>
              <div
                className={css({
                  display: 'flex',
                  flexDir: 'column',
                  flex: '1',
                  gap: '1.5rem',
                })}
              >
                <button
                  type="button"
                  className={css({
                    cursor: 'pointer',
                    bgColor: 'primary.normal',
                    borderRadius: '0.75rem',
                    borderWidth: '4px',
                    borderColor: 'label.disable',
                    h: '1/2',
                    textStyle: 'title2.bold',
                  })}
                  onClick={() => handleClickType('CHILD')}
                >
                  자녀 회원가입
                </button>
                <button
                  type="button"
                  className={css({
                    cursor: 'pointer',
                    bgColor: 'secondary.normal',
                    borderRadius: '0.75rem',
                    borderWidth: '4px',
                    borderColor: 'label.disable',
                    h: '1/2',
                    textStyle: 'title2.bold',
                  })}
                  onClick={() => handleClickType('PARENT')}
                >
                  부모 회원가입
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div
                className={css({
                  textStyle: 'heading1.bold',
                })}
              >
                사용할 닉네임을 입력해 주세요.
              </div>
              <div
                className={css({
                  display: 'flex',
                  flexDir: 'column',
                  flex: '1',
                  gap: '1.5rem',
                })}
              >
                <div
                  className={css({
                    display: 'flex',
                    flexDir: 'column',
                    gap: '2.5rem',
                  })}
                >
                  <section
                    className={css({ display: 'flex', flexDir: 'column' })}
                  >
                    <input
                      type="text"
                      id="nickname"
                      defaultValue={data?.nickName}
                      className={css({
                        h: '2.5rem',
                        borderRadius: '0.5rem',
                        pl: '0.5rem',
                        borderColor: 'line.normal',
                      })}
                      placeholder="닉네임을 입력해주세요."
                      onKeyUp={(e) => {
                        if (e.code == 'Enter') {
                          handleNextStep();
                        }
                      }}
                      {...register('nickname', { required: true })}
                    />
                    <p
                      className={css({
                        textStyle: 'caption1.bold',
                        color: 'secondary.heavy',
                      })}
                    >
                      {errors.nickname?.message}
                    </p>
                  </section>
                  <button
                    type="button"
                    className={css({
                      bgColor: 'primary.normal',
                      borderRadius: '0.5rem',
                      height: '2.5rem',
                    })}
                    onClick={handleNextStep}
                  >
                    다음
                  </button>
                </div>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div
                className={css({
                  textStyle: 'heading1.bold',
                })}
              >
                가족 코드가 있나요?
                <span
                  className={css({
                    display: 'block',
                    textStyle: 'label1.normal.medium',
                  })}
                >
                  가족 코드가 있다면 입력해 주세요!
                </span>
              </div>
              <div
                className={css({
                  display: 'flex',
                  flexDir: 'column',
                  flex: '1',
                  gap: '1.5rem',
                })}
              >
                <div
                  className={css({
                    display: 'flex',
                    flexDir: 'column',
                    gap: '2.5rem',
                  })}
                >
                  <section
                    className={css({ display: 'flex', flexDir: 'column' })}
                  >
                    <input
                      type="text"
                      id="familyId"
                      className={css({
                        h: '2.5rem',
                        borderRadius: '0.5rem',
                        pl: '0.5rem',
                        borderColor: 'line.normal',
                      })}
                      {...register('familyId')}
                    />
                    <p
                      className={css({
                        textStyle: 'caption1.bold',
                        color: 'secondary.heavy',
                      })}
                    >
                      {errors.familyId?.message}
                    </p>
                  </section>
                  <button
                    type="submit"
                    className={css({
                      bgColor: 'primary.normal',
                      borderRadius: '0.5rem',
                      height: '2.5rem',
                    })}
                    onClick={handleNextStep}
                  >
                    가입하기
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Join;
