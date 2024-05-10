import { css } from 'styled-system/css';
import { Container, HStack, Stack } from 'styled-system/jsx';
import { Button } from '~/components/ui/button';
import * as Card from '~/components/ui/card';
import { FormLabel } from '~/components/ui/form-label';
import { Input } from '~/components/ui/input';
import Image from 'next/image';

interface GoodsCardProps extends Card.RootProps {
  url: string;
  brand: string;
  name: string;
  price: number;
}

const GoodsCard = ({ url, brand, name, price, ...props }: GoodsCardProps) => {
  return (
    <Card.Root
      rounded="0.5rem"
      border="solid"
      borderWidth="1px"
      borderColor="neutral.300"
      bg="transparent"
      width="sm"
      {...props}
    >
      <Card.Body
        className={css({
          py: '1rem',
          gap: '1rem',
          alignItems: 'center',
        })}
      >
        <HStack w="full" h="4.75rem" gap="1rem" alignItems="center">
          <Container
            className={css({
              w: '4.75rem',
              h: '4.75rem',
              rounded: 'lg',
              bg: 'neutral.300',
              flexShrink: 0,
            })}
          >
            <Image src={url} fill alt="상품 이미지" />
          </Container>
          <Stack
            className={css({ flexGrow: 1, overflow: 'hidden' })}
            h="full"
            justify="space-between"
          >
            <p>{brand}</p>
            <p>{name}</p>
          </Stack>
        </HStack>
        <hr
          className={css({
            w: '100%',
            color: 'neutral.300',
            borderWidth: '1px',
          })}
        />
      </Card.Body>
      <Card.Footer gap="3" className={css({ fontSize: '1rem' })}>
        <HStack minW="full" justify="space-between">
          <p>결제 금액</p>
          <HStack textAlign="center" alignItems="center">
            <p
              className={css({
                textAlign: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              })}
            >
              {price}
            </p>
            <Image src="/coin.svg" width={25} height={25} alt="coin" />
          </HStack>
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
};
export default GoodsCard;
