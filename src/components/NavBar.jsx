import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';


const NavBar = () => {


  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const handleLogout = async () => {

    try {
      const res = await axios.post(
        BASE_URL+"/logout",
        {},
        {withCredentials: true}
      )
      dispatch(removeUser());
      return navigate("/login")
      
    } catch (error) {
      console.error(error.message)
      
    }

  }




  return (
    <div className="navbar bg-[#38c02b] shadow-sm">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl">DevCorner</Link>
    </div>
   {user && <div className="flex gap-2">
      {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
      <div className="dropdown dropdown-end me-4 flex">

      <p className='px-4 pt-2'>Welcome {user.firstName}</p>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
         <div className="w-10 rounded-full">
            <img
              alt="User photo"
              src={user.photoUrl} />
          </div>
        </div>
        <ul
          tabIndex="-1"
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <Link to="/profile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <Link to={"/connections"}>Connections</Link>
            </li>
            <li>
            <Link to={"/requests"}>Requests</Link>
            </li>
            <li>
              <Link to={"/premium"}>Premium</Link>
            </li>
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </div>}
  </div>
  )
}

export default NavBar