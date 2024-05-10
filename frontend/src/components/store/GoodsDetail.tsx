import Image from 'next/image';
import { css } from 'styled-system/css';
import { Container, HStack, Stack } from 'styled-system/jsx';

const GoodsDetail = ({
  name,
  price,
  url,
}: {
  name: string;
  price: number;
  url: string;
}) => {
  return (
    <div>
      <Container w="full" aspectRatio={1} px={0}>
        <Image
          src={url}
          fill
          objectFit="cover"
          objectPosition="center"
          alt="상품 이미지"
        />
      </Container>
      <Stack justify="space-between" px={'1rem'} py={'1.25rem'}>
        <p className={css({ fontSize: '1.75rem', fontWeight: 'bold' })}>
          {name}
        </p>
        <HStack>
          <p className={css({ fontSize: '1.75rem' })}>{price}</p>
          <Image src="/coin.svg" width={20} height={20} alt="coin" />
        </HStack>
      </Stack>
    </div>
  );
};
export default GoodsDetail;
