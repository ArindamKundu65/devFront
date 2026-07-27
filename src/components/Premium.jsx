import React from 'react'

const Premium = () => {
    return (
        <div className="flex w-full mt-10">
            <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
                <h1 className='font-bold text-3xl'>Silver Membership</h1>
                <ul>
                    <li> - Chat with other people</li>
                    <li> - 100 connection requests per day</li>
                    <li> - Blue Tick</li>
                    <li> - 3 months</li>
                </ul>
                <button className='btn bg-gray-400'>Buy Sliver</button>
            </div>
            <div className="divider divider-horizontal">OR</div>
            <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
                <h1 className='font-bold text-3xl'>Gold Membership</h1>
                <ul>
                    <li> - Chat with other people</li>
                    <li> - Infinite connection requests per day</li>
                    <li> - Blue Tick</li>
                    <li> - 6 months</li>
                </ul>
                <button className='btn btn-warning'>Buy Gold</button>
            </div>
        </div>
    )
}

export default Premium