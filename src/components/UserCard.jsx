import React from 'react'

const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, age, gender, about } = user;

    console.log(user)
    return (
        <div>
            <div className="card bg-base-300 w-96 shadow-sm my-20">
                <figure>
                    <img
                        src={photoUrl}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <p>
                        {age && `Age: ${age}, `}
                        {gender && `${gender}, `}
                        {about}
                    </p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary">Sent Request</button>
                        <button className="btn btn-secondary">Ignore</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard