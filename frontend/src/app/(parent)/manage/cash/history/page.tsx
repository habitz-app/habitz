import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import { stack } from 'styled-system/patterns';

interface CashHistoryProps {
  id: number;
  date: string;
  time: string;
  title: string;
  user: string;
  habitz: number;
  type: '사용' | '충전';
}
const CashHistory = () => {
  let dummyFamilyCash: number = 10000;
  let dummyCashHistories: CashHistoryProps[] = [
    {
      id: 1,
      date: '2021-09-01',
      time: '12:00',
      title: '플라스틱 줍기',
      user: '김둘째',
      habitz: 100,
      type: '사용',
    },
    {
      id: 2,
      date: '2021-09-01',
      time: '11:00',
      title: '캔 줍기',
      user: '김첫째',
      habitz: 200,
      type: '사용',
    },
    {
      id: 3,
      date: '2021-09-02',
      time: '14:01',
      title: '수학 숙제 5페이지',
      user: '김첫째',
      habitz: 500,
      type: '사용',
    },
    {
      id: 4,
      date: '2021-09-02',
      time: '16:20',
      title: '해비츠 충전',
      user: '김싸피',
      habitz: 100,
      type: '충전',
    },
    {
      id: 5,
      date: '2021-09-05',
      time: '12:00',
      title: '플라스틱 줍기',
      user: '김싸피',
      habitz: 100,
      type: '사용',
    },
  ];

  return (
    <div className={stack({ align: 'center' })}>
      <Stack className={css({ width: 300, height: 130, bg: 'green.300' })}>
        <p>가족 해빗</p>
        <HStack justify={'space-between'}>
          <p>{dummyFamilyCash}</p>
          <button>충전</button>
        </HStack>
      </Stack>
      <div className={stack({ width: 300 })}>
        <div>
          <button className={css({ borderWidth: 1 })}>전체</button>
          <button className={css({ borderWidth: 1 })}>충전</button>
          <button className={css({ borderWidth: 1 })}>사용</button>
        </div>
        <div>기간 선택</div>
        <div>기간 및 건 수</div>
        <div>
          <ul>
            {/*날짜 별*/}
            {/*내역*/}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CashHistory;
