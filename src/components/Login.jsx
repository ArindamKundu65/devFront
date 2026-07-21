import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId, setEmailId] = useState("aakk2002+1@gmail.com");
    const [password, setPassword] = useState("aA!2aaaa");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("")



    const handleLogin = async () => {


       try {const res = await axios.post(BASE_URL + "/login", {
            emailId,
            password
        },
        {
            withCredentials: true
        }
    
    )
        dispatch(addUser(res.data.user));
        navigate("/");
    }
        catch(err){
            console.error(err.response)
            setError(err.response.data);
        }

    }

    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-200 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-2xl justify-center">Login</h2>
                    <fieldset className="fieldset">
                        <legend className="fieldset">Email Id</legend>

                        <input type="text"
                            value={emailId}
                            className="input"
                            placeholder="Type here"
                            onChange={(e) => setEmailId(e.target.value)}
                        />

                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset">Password</legend>

                        <input type="text"
                            value={password}
                            className="input"
                            placeholder="Type here"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />

                    </fieldset>
                    <p className='text-red-400'>{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary"
                        onClick={handleLogin}
                        >Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login