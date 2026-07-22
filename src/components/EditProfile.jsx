import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import axios from 'axios';
const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "")
    const [about, setAbout] = useState(user.about)
    const [gender, setGender] = useState(user.gender || "")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [showToast, setShowToast] = useState(false);

    const SaveProfile = async () => {

        setError("")
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit",
                { firstName, lastName, photoUrl, age, about, gender },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));

            setShowToast(true);

            setTimeout(()=>{
                setShowToast(false)
            }, 3000);

        } catch (err) {
            setError(err.response?.data);
            console.log(err.response.data)
        }
    }





    return (

        <>
            <div className='flex justify-around'>
                <div className='flex justify-center my-5'>
                    <div className="card bg-base-200 w-96 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-2xl justify-center">Edit Profile</h2>
                            <fieldset className="fieldset">
                                <legend className="fieldset">First Name</legend>

                                <input type="text"
                                    value={firstName}
                                    className="input"
                                    placeholder="Type here"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />

                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset">Last Name</legend>

                                <input type="text"
                                    value={lastName}
                                    className="input"
                                    placeholder="Type here"
                                    onChange={(e) => {
                                        setLastName(e.target.value)
                                    }}
                                />

                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset">Photo URL</legend>

                                <input type="text"
                                    value={photoUrl}
                                    className="input"
                                    placeholder="Type here"
                                    onChange={(e) => {
                                        setPhotoUrl(e.target.value)
                                    }}
                                />

                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset">Age</legend>

                                <input type="text"
                                    value={age}
                                    className="input"
                                    placeholder="Type here"
                                    onChange={(e) => {
                                        setAge(e.target.value)
                                    }}
                                />

                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset">About</legend>

                                <input type="text"
                                    value={about}
                                    className="input"
                                    placeholder="Type here"
                                    onChange={(e) => {
                                        setAbout(e.target.value)
                                    }}
                                />

                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset">Gender</legend>

                                <input type="text"
                                    value={gender}
                                    className="input"
                                    placeholder="Type here"
                                    onChange={(e) => {
                                        setGender(e.target.value)
                                    }}
                                />

                            </fieldset>
                            <p className='text-red-400'>{error}</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary"
                                    onClick={SaveProfile}
                                >Save Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, photoUrl, age, about }} />

                {showToast && (<div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>User saved successfully.</span>
                    </div>
                </div>)}
            </div>
        </>

    )
}

export default EditProfile