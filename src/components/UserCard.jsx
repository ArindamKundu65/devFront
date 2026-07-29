import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user;

    const dispatch = useDispatch();

    const handleRequest = async (status, userId) => {

        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {},
                { withCredentials: true }
            );

            dispatch(removeUserFromFeed(userId));

        } catch (error) {
            console.log(skills);
            console.log(Array.isArray(skills));
            console.log(error.response.data.message);

        }
    }

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
                    <p className=''>
                        {age && `Age: ${age}, `}
                        {gender && `${gender}, `}
                        {about}

                    </p>
                    <p>
                        {skills && `Skills: ${skills.join(", ")}`}
                    </p>
                    {/* <p>{JSON.stringify(skills)}</p> */}
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary"
                            onClick={() => handleRequest("interested", _id)}
                        >Sent Request
                        </button>
                        <button className="btn btn-secondary"
                            onClick={() => handleRequest("ignored", _id)}>
                            Ignore
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard