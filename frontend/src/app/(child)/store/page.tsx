import StoreCategory from '@/components/store/StoreCategory';
import Link from 'next/link';
import { Stack } from 'styled-system/jsx';

const Category = () => {
  return (
    <Stack justify={'space-between'}>
      <Link href="/store/category/toy">
        <StoreCategory type="toy" name="장난감/인형"></StoreCategory>
      </Link>
      <Link href="/store/category/book">
        <StoreCategory type="book" name="도서/동화책"></StoreCategory>
      </Link>
      <Link href="/store/category/stationery">
        <StoreCategory type="stationery" name="문구류"></StoreCategory>
      </Link>
      <Link href="/store/category/convenienceStore">
        <StoreCategory type="convenienceStore" name="편의점"></StoreCategory>
      </Link>
      <Link href="/store/category/iceCream">
        <StoreCategory type="iceCream" name="음료/아이스크림"></StoreCategory>
      </Link>
    </Stack>
  );
};
export default Category;
