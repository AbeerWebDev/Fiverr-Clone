/* eslint-disable react/prop-types */
import React from 'react'
import './Reviews.scss'
import Review from '../review/Review';
import newRequest from '../../utils/newRequest'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Reviews = ({gigId}) => {

  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
       newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  }); 

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () =>{
      queryClient.invalidateQueries("reviews")
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    const desc = e.target[0].value
    const star = e.target[1].value
    mutation.mutate({ gigId, desc, star });
  }

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "Loading..."
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Add a Review</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="Tell us what you think" />
          <select name="" id="">
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Reviews