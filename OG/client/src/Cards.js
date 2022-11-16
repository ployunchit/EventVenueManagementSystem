import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these Events!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='/img-1.jepg'
              text='9:00 PM 10/30/22'
              label='Tennis'
              path='/login'
            />
            <CardItem
              src='/img-2.jpeg'
              text='3:00 PM 10/31/22'
              label='Skateboarding'
              path='/login'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='/img-3.jpeg'
              text='5:00 PM 11/3/22'
              label='Volleyball'
              path='/login'
            />
            <CardItem
              src='/img-4.jpeg'
              text='2:00 PM 11/4/22'
              label='Canoeing'
              path='/login'
            />
            <CardItem
              src='/img-5.jpeg'
              text='1:00 PM 11/5/22'
              label='Rock Climbing'
              path='/login'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;