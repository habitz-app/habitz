import { HStack } from 'styled-system/jsx';

const DayPicker = () => {
  return (
    <HStack>
      <div>
        <button>월</button>
      </div>
      <div>
        <button>화</button>
      </div>
      <div>
        <button>수</button>
      </div>
      <div>
        <button>목</button>
      </div>
      <div>
        <button>금</button>
      </div>
      <div>
        <button>토</button>
      </div>
      <div>
        <button>일</button>
      </div>
    </HStack>
  );
};
export default DayPicker;
