'use client';
import InputLabeled from './inputLabeled';
import DatePicker from './datepicker';
import { stack } from 'styled-system/patterns';
import { css } from 'styled-system/css';
import { Button } from '@/components/ui/button';
import DayPicker from './daypicker';

const clickHandler = () => {
  console.log(1);
};

const Page = () => {
  return (
    <div
      className={stack({
        px: '16px',
        py: '20px',
        justify: 'between',
        align: 'center',
      })}
    >
      <h1 className={css({ width: 'full' })}>미션 생성</h1>
      <InputLabeled
        id="미션"
        label="미션"
        placeholder="미션을 입력하세요"
      ></InputLabeled>
      <InputLabeled
        id="내용"
        label="내용"
        placeholder="내용을 입력하세요"
      ></InputLabeled>
      <InputLabeled
        id="포인트"
        label="포인트"
        placeholder="포인트를 입력하세요"
        type="number"
      ></InputLabeled>
      <DatePicker />
      <DayPicker />
      <Button width="full" onClick={clickHandler}>
        생성하기
      </Button>
    </div>
  );
};
export default Page;
