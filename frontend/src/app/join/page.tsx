'use client';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';

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
    .min(2, { message: '두글자 넘겨라' })
    .max(16, { message: '혓바닥이 길다' }),
  familyId: z.string().optional(),
});

const Join = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinForm>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<JoinForm> = (data) => {
    console.log(data);
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
        {step !== 1 && (
          <Button
            color="label.alternative"
            variant="link"
            onClick={() => setStep(1)}
          >
            <IonIcon
              icon={chevronBackOutline}
              className={css({
                w: '24px',
                h: '24px',
              })}
            />
          </Button>
        )}
      </header>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <div>
              <label htmlFor="parent">부모</label>
              <input
                type="radio"
                value="PARENT"
                id="parent"
                onClick={() => setStep(2)}
                {...register('memberRole')}
              />
              <label htmlFor="child">자녀</label>
              <input
                type="radio"
                value="CHILD"
                id="child"
                onClick={() => setStep(2)}
                {...register('memberRole')}
              />
            </div>
          )}
          {step === 2 && (
            <div className={css({ display: 'flex', flexDir: 'column' })}>
              <label htmlFor="nickname">닉네임 입력</label>
              <input
                type="text"
                id="nickname"
                {...register('nickname', { required: true })}
              />
              <p>{errors.nickname?.message}</p>
              <label htmlFor="familyId">초대코드 입력</label>
              <input
                type="text"
                id="familyId"
                placeholder="초대코드가 있다면 입력하세요"
                {...register('familyId')}
              />
              <button type="submit"> 가입하기 </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Join;
