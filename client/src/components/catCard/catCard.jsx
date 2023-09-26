import React from 'react'
import './CatCard.scss'
import { Link } from "react-router-dom"

const CatCard = ({ item }) => {
  return (
    <div className='catCard'>
      <Link className='link' to='/gigs?cat=design'>
        <img src={item.img} alt="" />
        <span className='desc'>{item.desc}</span>
        <span className='title'>{item.title}</span>
      </Link>
    </div>
  )
}

export default CatCard