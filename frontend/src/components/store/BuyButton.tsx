import { Button } from '../ui/button';
import { Stack } from 'styled-system/jsx';

const BuyButton = ({ clickHandler }: { clickHandler: () => void }) => {
  return (
    <Stack
      w="full"
      px="1rem"
      pt="2.25rem"
      pb="1.25rem"
      position="sticky"
      bgGradient={'to-t'}
      gradientFrom={'background.normal.normal/80'}
      gradientTo={'transparent'}
      bottom="5rem"
      backdropFilter="auto"
      backdropBlur="sm"
    >
      <Button
        onClick={clickHandler}
        variant={'ghost'}
        w={'full'}
        bg={'#CDEA80'}
        rounded={'1rem'}
        minH={'4.25rem'}
        fontSize={'1.5rem'}
      >
        구매하기
      </Button>
    </Stack>
  );
};
export default BuyButton;
