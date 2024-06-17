import React from 'react';
import { useSelector } from 'react-redux';

export const Card = ({ activeCard, setFlip, flip }) => {
  const cardsItems = useSelector((state) => state.data.cards);

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      onClick={() => setFlip(!flip)}>
      <div className='front'>{cardsItems[activeCard].question}</div>
      <div className='back'>{cardsItems[activeCard].answer}</div>
    </div>
  );
};
