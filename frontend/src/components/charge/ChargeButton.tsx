import { Button } from '@/components/ui/button';

const ChargeButton = () => {
  return (
    <Button
      variant={'solid'}
      size={'2xl'}
      w={'full'}
      bg={'primary.normal'}
      color={'label.normal'}
      borderRadius={'1rem'}
      textStyle={'headline1.bold'}
    >
      충전하기
    </Button>
  );
};

export default ChargeButton;
