import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId, setEmailId] = useState("aakk2002+1@gmail.com");
    const [password, setPassword] = useState("aA!2aaaa");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [error, setError] = useState("")


const handleSignUp = async () => {
    try {

        const res = await axios.post(BASE_URL + "/signup", {firstName, lastName, emailId, password},
            {withCredentials: true}
        );
        dispatch(addUser(res.data.data));
        console.log(res.data.data)
        return navigate("/profile")
        
    }  catch(err){
        console.error(err.response)
        setError(err.response.data);
    }
}




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
                    <h2 className="card-title text-2xl justify-center">{isLoginForm ? "Login" : "SignUp"}</h2>
                    {!isLoginForm && 
                        (<>
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
                            onChange={(e) => setLastName(e.target.value)}
                        />

                    </fieldset>
                    </>
                    )}
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
                        onClick={isLoginForm ? handleLogin : handleSignUp}
                        >
                            {isLoginForm ? "Login" : "SignUp"}
                        </button>
                    </div>
                            <p className='m-auto text-lime-400' onClick={()=>setIsLoginForm((value)=> !value)} >{isLoginForm ? "New User? SignUp here" : "Existing user? Login here"}</p>

                </div>
            </div>
        </div>
    )
}

export default Login