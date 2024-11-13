import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
   const [subCategory, setSubCategory] = useState('topwear');
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));
      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(`${backendURL}/api/product/add`, formData,{headers:{token}});
      if(response.data.success){
        toast.success(response.data.message)
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('')
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('There was an error adding the product:', error);
        toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      {/* Upload Images */}
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {/* Render Image Upload Labels */}
          {[image1, image2, image3, image4].map((img, idx) => (
            <label key={idx} htmlFor={`image${idx + 1}`}>
              <img className='w-20' src={!img ? assets.upload_area : URL.createObjectURL(img)} alt='' />
              <input onChange={(e) => eval(`setImage${idx + 1}(e.target.files[0])`)} type='file' id={`image${idx + 1}`} hidden />
            </label>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className='w-full max-w-[500px] px-3 py-2'
          type='text'
          placeholder='Type here'
          required
        />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='w-full max-w-[500px] px-3 py-2'
          type='text'
          placeholder='Write Content here'
          required
        />
      </div>

      {/* Category and Price */}
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value='Men'>Men</option>
            <option value='Women'>Women</option>
            <option value='Kids'>Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value='Topwear'>Top Wear</option>
            <option value='Bottomwear'>Bottom Wear</option>
            <option value='Winterwear'>Winter Wear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className='w-full px-3 py-2 sm:w-[120px]'
            type='number'
            placeholder='500'
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p>Product Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size} onClick={() => setSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))}>
              <p className={`${sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>{size}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestSeller((prev) => !prev)} checked={bestseller} type='checkbox' id='bestseller' />
        <label className='cursor-pointer' htmlFor='bestseller'>
          Add To Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>
        {loading ? 'Adding...' : 'ADD'}
      </button>
    </form>
  );
};

export default Add;
