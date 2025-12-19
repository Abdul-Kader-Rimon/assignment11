import React, { useContext  } from 'react';
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
        <h2 className="text-2xl mt-20 md:text-5xl font-bold text-center text-primary mb-3">
         Support Blood Donation Program
        </h2>

        <p className="text-center mt-10 text-gray-600 mb-6 max-w-xl mx-auto">
          Your donation helps us manage blood donation requests, support donors,
          and ensure patients receive blood on time. Every contribution makes a
          real difference.
        </p>

        <form
          onSubmit={handleCheckout}
          className="flex justify-center items-center  mt-10 mb-10 gap-4"
        >
          <input
            type="text"
            name="donateAmount"
            placeholder="Enter Donate Amount"
            className="input"
          />
          <button className="btn btn-primary" type="submit">
            Donate
          </button>
        </form>
      </div>
    );
};

export default Donate;