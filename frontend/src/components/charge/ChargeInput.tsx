import { Input } from '@/components/ui/input';

const ChargeInput = ({ points }: { points: number }) => {
  return (
    <Input
      borderColor={'line.normal'}
      bg={'background.elevated.normal'}
      size={'sm'}
      type={'number'}
      placeholder="얼마를 충전할까요?"
      min={0}
      step={1000}
      value={points}
    />
  );
};

export default ChargeInput;
