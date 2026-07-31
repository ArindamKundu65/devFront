import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'




const Feed = () => {

  const [noMoreUsers, setNoMoreUsers] = useState(false);
  
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch();

  const getFeed = async () => {
    console.log("getFeed called");
  
    if (noMoreUsers) {
      console.log("Returning because noMoreUsers is true");
      return;
    }
  
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
  
      console.log("API response:", res.data);
  
      if (res.data.length === 0) {
        console.log("No users left");
        setNoMoreUsers(true);
        return;
      }
  
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
    if (!noMoreUsers && feed && feed.length === 0) {
      getFeed();
    }
  }, [feed, noMoreUsers]);

  useEffect(() => {
    console.log("Feed changed:", feed);
  }, [feed]);

  useEffect(() => {
    console.log("Effect fired");
    console.log("feed:", feed);
    console.log("noMoreUsers:", noMoreUsers);
  }, [feed, noMoreUsers]);

  return (
    <div className="flex justify-center my-10">
      {feed && feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : noMoreUsers ? (
        <h2>No more users available</h2>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default Feed