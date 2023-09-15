import React from 'react'
import './Home.scss'
import Featured from '../../components/featured/Featured'
import TrustedBy from '../../components/trustedBy/trustedBy';
import Slide from '../../components/Slide/Slide';
import { cards } from '../../data';
import CatCard from '../../components/catCard/catCard';


const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map(card => (
          <CatCard item={card} key={card.id} />
        ))}
      </Slide>
    </div>
  );
}

export default Home