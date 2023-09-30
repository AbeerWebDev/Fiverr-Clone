/* eslint-disable react/prop-types */
import React from 'react'
import './Reviews.scss'
import Review from '../review/Review';
import newRequest from '../../utils/newRequest'
import { useQuery } from "@tanstack/react-query";

const Reviews = ({gigId}) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["review"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  }); 
  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading ? "Loading..." : error ? "Something went wrong!" : data.map(review=> (
        <Review key={review._id} review={review}/>

      ))}
      <hr />
    </div>
  );
}

export default Reviews