import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 40;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token,setToken]=useState("");

    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        const cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }
        setCartItems(cartData); 

        if(token){
            try{
             await axios.post(backendUrl +"/api/cart/add",{itemId,size},{headers:{token}})
            }catch(error){
                console.log(error)
                toast.error(error.message)
            }
        }
    };

    const getCardCount = () => {
        return Object.values(cartItems).reduce((total, itemSizes) =>
            total + Object.values(itemSizes).reduce((count, qty) => count + qty, 0)
        , 0);
    };

    const updateQuantity = async(itemId, size, quantity) => {
        const cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId][size] = quantity;
            setCartItems(cartData);
            if(token){
                try{
         await axios.post(backendUrl+"/api/cart/update",{itemId,size,quantity},{headers:{token}})
                }catch(error){
                    console.log(error);
                    toast.error(error,message)
                }
            }
        }
    };

    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
            const itemInfo = products.find((p) => p._id === itemId);
            return itemInfo
                ? total + Object.entries(sizes).reduce((subTotal, [size, qty]) => subTotal + itemInfo.price * qty, 0)
                : total;
        }, 0);
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl+"/api/product/list");
             if(response.data.success){
                setProducts(response.data.products)
                console.log(response.data)
             }else{
                toast.error(response.data.message)
             }
        } catch (error) {
            toast.error("Failed to fetch products. Please try again later.");
            console.error("Failed to fetch products:", error);
        }
    };

    const getUserCart=async (token) =>{
      try{
          const response=await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
          if(response.data.success){
           setCartItems(response.data.cartData)
          }
      }catch(error){
         console.log(error)
         toast.error(error.message)
      } 
    }

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (!token && savedToken) {
            setToken(savedToken);
            getUserCart(savedToken);
        }
    }, []);
    
    
    const value = {
        products, // Updated variable name for consistency
        currency,
        delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems, addToCart,setCartItems,
        getCardCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken,token,
        
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
