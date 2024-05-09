import StoreCategory from '@/components/store/StoreCategory';
import Link from 'next/link';
import { Stack } from 'styled-system/jsx';

const Category = () => {
  const categories: {
    type: 'toy' | 'book' | 'stationery' | 'convenienceStore' | 'iceCream';
    name: string;
  }[] = [
    { type: 'toy', name: '장난감/인형' },
    { type: 'book', name: '도서/동화책' },
    { type: 'stationery', name: '문구류' },
    { type: 'convenienceStore', name: '편의점' },
    { type: 'iceCream', name: '음료/아이스크림' },
  ];
  return (
    <Stack h={'100%'} justify={'space-between'}>
      {categories.map((category, id) => (
        <Link
          key={id}
          href={{
            pathname: '/store/category',
            query: { category: category.name },
          }}
        >
          <StoreCategory
            type={category.type}
            name={category.name}
          ></StoreCategory>
        </Link>
      ))}
    </Stack>
  );
};
export default Category;
