import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItems from './ProductItems';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      setLatestProducts(products.slice(0, 10));
    } else {
      setLatestProducts([]); // Fallback if products is not an array
    }
  }, [products]);
  

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1='LATEST' text2='COLLECTIONS' />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Iusto praesentium facere ipsum error similique exercitationem quibusdam quisquam ex officia ab facilis accusantium ut dolores incidunt neque enim, fugiat magni dolorem nostrum molestiae vel totam alias rem? Illo, corrupti!
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProducts.map((item) => (
          <ProductItems key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
