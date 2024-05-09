import { useRouter } from 'next/router';

const Product = () => {
  const router = useRouter();
  return <div>Product {router.query.id}</div>;
};
export default Product;
