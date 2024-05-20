import Image from 'next/image';
import { css } from 'styled-system/css';

const GoodsItem = ({
  name,
  brand,
  url,
  price,
}: {
  name: string;
  brand: string;
  url: string;
  price: number;
}) => {
  return (
    <section
      className={css({
        display: 'flex',
        flexDir: 'column',
        w: '6.25rem',
        gap: '0.625rem',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgColor: 'static.white',
          borderWidth: '1px',
          borderRadius: '0.3125rem',
          borderColor: 'line.normal',
          position: 'relative',
          w: 100,
          h: 100,
        })}
      >
        <Image src={url} fill alt="상품 이미지" />
      </div>
      <div
        className={css({
          display: ' flex',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDir: 'column',
            w: 'full',
          })}
        >
          <span
            className={css({
              display: 'flex',
              textStyle: 'caption1.medium',
              color: 'label.alternative',
            })}
          >
            {brand}
          </span>
          <span
            className={css({
              textStyle: 'caption1.medium',
              color: 'static.black',
              h: '2.5rem',
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordWrap: 'break-word',
              lineClamp: 2,
            })}
          >
            {name}
          </span>
          <span
            className={css({
              display: 'flex',
              textStyle: 'caption2.bold',
              gap: 0.5,
              alignItems: 'center',
            })}
          >
            {price.toLocaleString()}
            <Image src="/coin.svg" width={12} height={12} alt="coin" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default GoodsItem;
