import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'




const Feed = () => {

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch();

  const getFeed = async () => {
    console.log("Fetching page:", page);
  
    if (!hasMore) return;
  
    try {
      const res = await axios.get(
        `${BASE_URL}/feed?page=${page}&limit=10`,
        {
          withCredentials: true,
        }
      );
  
      console.log("API returned:", res.data);
  
      if (res.data.length === 0) {
        setHasMore(false);
        return;
      }
  
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, [page]);

  useEffect(() => {
    if (hasMore && feed && feed.length === 0) {
      setPage((prev) => prev + 1);
    }
  }, [feed, hasMore]);

  useEffect(() => {
    console.log("Feed changed:", feed);
  }, [feed]);

return (
  <div className="flex justify-center my-10">
    {feed && feed.length > 0 ? (
      <UserCard user={feed[0]} />
    ) : hasMore ? (
      <h2>Loading...</h2>
    ) : (
      <h2>No more users available</h2>
    )}
  </div>
);
}

export default Feed