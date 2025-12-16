import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import useAxios from '../../../Hooks/useAxios';
 

const Donate = () => {
    const { user } = useContext(AuthContext);
    const axiosInstance = useAxios();
 





    const handleCheckout = (e) => {
        e.preventDefault();

        const donateAmount = e.target.donateAmount.value;
        const donarEmail = user?.email;
        const donarName = user?.displayName;

        const formData = {
            donateAmount,
            donarEmail,
            donarName
        }


        axiosInstance.post('/create-payment-checkout', formData ).then(res => {
            console.log(res.data);
             window.location.href = res.data.url
            
        })
    }

    return (
        <div>
            <form onSubmit={handleCheckout} className='flex justify-center items-center min-h-screen gap-4'>
                <input type="text" name='donateAmount' placeholder='Enter Donate Amount' className='input' />
                <button className='btn btn-primary' type='submit'>Donate</button>
             </form>
        </div>
    );
};

export default Donate;