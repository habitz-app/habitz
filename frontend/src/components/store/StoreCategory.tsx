import { css, cva } from 'styled-system/css';

const categoryRecipe = cva({
  base: {
    w: 'full',
    h: '6.25rem',
    p: '0.625rem',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    bgPositionX: 'center',
    bgPositionY: 'center',
    bgSize: 'cover',
    bgClip: 'border-box',
    bgRepeat: 'no-repeat',
    borderRadius: '1.25rem',
  },
  variants: {
    type: {
      toy: {
        bgImage:
          'linear-gradient(rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url(/toy.jpg) ',
      },
      book: {
        bgImage:
          'linear-gradient(rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url(/book.jpg)',
      },
      stationery: {
        bgImage:
          'linear-gradient(rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url(/stationery.jpg)',
      },
      convenienceStore: {
        bgImage:
          'linear-gradient(rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url(/convenience-store.jpg)',
      },
      iceCream: {
        bgImage:
          'linear-gradient(rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url(/ice-cream.jpg)',
      },
    },
  },
});

const StoreCategory = ({
  type,
  name,
}: {
  type: 'toy' | 'book' | 'stationery' | 'convenienceStore' | 'iceCream';
  name: string;
}) => {
  return (
    <div
      className={css({
        bgClip: 'border-box',
        position: 'relative',
      })}
    >
      <div className={categoryRecipe({ type })}></div>
      <span
        className={css({
          textStyle: 'title3.bold',
          color: 'static.white',
          zIndex: '1',
          display: 'block',
          position: 'absolute',
          top: '50%',
          left: '50%',
          translate: 'auto',
          translateX: '-1/2',
          translateY: '-1/2',
        })}
      >
        {name}
      </span>
    </div>
  );
};

export default StoreCategory;
