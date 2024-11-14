import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
const Cart = () => {
  const { products, currency, cartItems, updateCartItem, removeCartItem ,updateQuantity,navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if(products.length>0){
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            });
          }
        }
      }
      setCartData(tempData);  // Set the state with updated cart data
      console.log(tempData); 
    }
  // Optional: For debugging purposes
  }, [cartItems,products]);

  // Function to handle quantity changes
  const handleQuantityChange = (e, id, size) => {
    const newQuantity = e.target.value;
    if (newQuantity >= 1) {
      updateCartItem(id, size, newQuantity); // Assuming `updateCartItem` is available from ShopContext
    }
  };

  // Function to handle item deletion
  const handleDeleteItem = (id, size) => {
    removeCartItem(id, size); // Assuming `removeCartItem` is available from ShopContext
  };

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={"Your"} text2={"CART"} />
      </div>
      <div>
  {cartData.map((item, index) => {
    const productData = products.find((product) => product._id === item._id);
    
    if (!productData) {
      return null; // Handle the case where product data is not found
    }

    return (
      <div
        key={`${item._id}-${item.size || index}`}  // Unique key combining _id and size
        className='py-4 border-t border-b text-gray-700 grid grid-cols-[65%_20%_15%] sm:grid-cols-[60%_30%_10%] items-center gap-4'
      >
        <div className='flex items-start gap-6'>
          <img className='w-16 sm:w-20' src={productData.image[0]} alt={productData.name} />
          <div>
            <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
            <div className='flex items-center gap-5 mt-2'>
              <p>{currency}{productData.price}</p>
              <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
            </div>
          </div>
        </div>

        <input
          className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
          type="number"
          min={1}
          defaultValue={item.quantity}
          onChange={(e) => {
            const newValue = Number(e.target.value);  // Convert the value to a number
            if (newValue === 0 || isNaN(newValue)) {
              return;  // Do nothing if the value is 0 or invalid
            }
            updateQuantity(item._id, item.size, newValue);  // Call the update function with valid data
          }}
          aria-label={`Quantity of ${productData.name}`}
        />

        <img
          className='w-4 mr-4 sm:w-5 cursor-pointer'
          src={assets.bin_icon}
          alt="Delete item"
          onClick={() => updateQuantity(item._id, item.size, 0)}
        />
      </div>
    );
  })}
</div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal/>
          <div className='w-full text-end'>
            <button onClick={()=>navigate('/palce-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
