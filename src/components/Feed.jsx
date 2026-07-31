import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'




const Feed = () => {

  const [loading, setLoading] = useState(true);
  
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch();

  const getFeed = async () => {
    setLoading(true);
  
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
  
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err.response?.status);
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
    if (feed && feed.length === 0) {
      getFeed();
    }
  }, [feed]);

  useEffect(() => {
    console.log("Feed changed:", feed);
  }, [feed]);

  return (
    <div className="flex justify-center my-10">
      {loading ? (
        <h2>Loading...</h2>
      ) : feed && feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <h2>No more users available</h2>
      )}
    </div>
  );
}

export default Feed