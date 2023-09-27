import React from 'react'
import './GigCard.scss'
import { Link  } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';


const GigCard = ({item}) => {

  const { isLoading, error, data } = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () =>
      newRequest
        .get(`/users/`)
        .then((res) => {
          return res.data;
        }),
  });
  return (
    <Link className='link' to='/gig/123'>
      <div className='gigCard'>
        <img src={item.cover} alt="" />
        <div className="info">
          <div className="user">
            <img src={item.pp} alt="" />
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src='../img/star.png' alt="" />
            <span>{item.star}</span>
          </div>
        </div>
      <hr />
      <div className="details">
        <img src='../img/heart.png' alt="" />
        <div className="price">
          <span>STARTING AT</span>
          <h2>${item.price}</h2>
        </div>
      </div>
      </div>
    </Link>
  )
}

export default GigCard