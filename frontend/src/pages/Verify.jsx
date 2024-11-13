import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verify = () => {
    const { navigate, token, setCardItems, backendUel } = useContext(ShopContext);
    const [searchParams] = useSearchParams();
     
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token) return null;
            
            const response = await axios.post(
                `${backendUel}/api/order/verifyStripe`,
                { success, orderId },
                { headers: { token } }
            );
         
            if (response.data.success) {
                setCardItems({});
                navigate('/orders');
                toast.success("Payment verified successfully!");
            } else {
                navigate('/cart');
                toast.error("Payment verification failed.");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred during payment verification.");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []); 

    return (
        <div className="verify-container">
            <h2>Verifying your payment...</h2>
            <p>Please wait while we confirm your payment details.</p>
        </div>
    );
};

export default Verify;
