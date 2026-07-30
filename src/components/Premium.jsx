import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants'

const Premium = () => {

    const [isUserPremium, setIsUserPremium] = useState(false)

    const verifyPremiumUser = async () => {
        const res = await axios.get(BASE_URL + "/premium/verify", 
            {withCredentials:true}
        )

        if(res.data.isPremium) {
            setIsUserPremium(true)
        }
    }

    const handleBuyClick = async (type) => {

        try {
            const { data: order } = await axios.post(
                BASE_URL + "/payment/create",
                {
                    memberShipType: type
                },
                {
                    withCredentials: true
                }
            );

            const { amount, keyId, currency, notes, orderId } = order;

            const options = {
                key: keyId,
                amount,
                currency,
                name: 'Dev Corner',
                description: 'Connect to other developers',
                order_id: orderId,

                prefill: {
                    name: notes.firstName + ' ' + notes.lastName,
                    email: notes.emailId,
                    contact: '9999999999'
                },

                theme: {
                    color: '#AAFF00'
                },
                handler : verifyPremiumUser
            };

            const rzp = new Razorpay(options);
            rzp.open();

        } catch (error) {
            console.log(error);
        }
    };


    return isUserPremium ? "You are already a Premium user" : (
        <div className="flex w-full mt-10">

            <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">

                <h1 className='font-bold text-3xl'>
                    Silver Membership
                </h1>

                <ul>
                    <li>- Chat with other people</li>
                    <li>- 100 connection requests per day</li>
                    <li>- Blue Tick</li>
                    <li>- 3 months</li>
                </ul>

                <button
                    onClick={() => handleBuyClick("silver")}
                    className='btn bg-gray-400 hover:bg-gray-500'
                >
                    Buy Silver
                </button>

            </div>


            <div className="divider divider-horizontal">
                OR
            </div>


            <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">

                <h1 className='font-bold text-3xl'>
                    Gold Membership
                </h1>

                <ul>
                    <li>- Chat with other people</li>
                    <li>- Infinite connection requests per day</li>
                    <li>- Blue Tick</li>
                    <li>- 6 months</li>
                </ul>

                <button
                    onClick={() => handleBuyClick("gold")}
                    className='btn btn-warning'
                >
                    Buy Gold
                </button>

            </div>

        </div>
    ) 
}

export default Premium