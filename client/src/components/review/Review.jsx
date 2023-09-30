import React from 'react'
import './Review.scss'

const Review = ({review}) => {
  return (
    <div>
      <div className="review">
        <div className="user">
          <img
            className="pp"
            src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <div className="info">
            <span>John Doe</span>
            <div className="country">
              <img
                src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                alt=""
              />
              <span>United States</span>
            </div>
          </div>
        </div>
        <div className="stars">

          {new Array(review.star)
            .fill()
            .map((item, i) => (
              <img src="/img/star.png" alt="" key={i} />
            ))}
          <span>{review.star}</span>
        </div>
        <p>{review.desc}</p>
        <div className="helpful">
          <span>Helpful?</span>
          <img src="/img/like.png" alt="" />
          <span>Yes</span>
          <img src="/img/dislike.png" alt="" />
          <span>No</span>
        </div>
      </div>
    </div>
  );
}

export default Review