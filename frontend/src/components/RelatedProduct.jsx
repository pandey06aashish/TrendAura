import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItems from './ProductItems';

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      // Filter by category
      productsCopy = productsCopy.filter((item) => category === item.category);
      // Filter by subCategory (fixed)
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
      // Set the related products
      setRelated(productsCopy.slice(0, 5)); // Limit to 5 items
      
    }
  }, [products, category, subCategory]);

  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={"RELATED"} text2={"PRODUCTS"} />
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                related.map((item,index)=>(
               <ProductItems key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
                ))
            }
        </div>
    </div>
  );
};

export default RelatedProduct;
