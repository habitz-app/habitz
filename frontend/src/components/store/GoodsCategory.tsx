import { css } from 'styled-system/css';
import Image from 'next/image';
const GoodsCategory = ({ url, brand }: { url: string; brand: string }) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        w: 50,
        h: 'full',
        gap: 0.25,
      })}
    >
      <div
        className={css({
          display: 'flex',
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          w: 50,
          h: 50,
          borderRadius: '17px',
          bgColor: 'static.white',
          overflow: 'hidden',
          shadow: 'normal',
        })}
      >
        <Image src={url} width={42} height={42} alt="category" />
      </div>
      <span
        className={css({
          display: 'flex',
          w: 'full',
          justifyContent: 'center',
          textStyle: 'caption2.bold',
        })}
      >
        {brand}
      </span>
    </div>
  );
};

export default GoodsCategory;
