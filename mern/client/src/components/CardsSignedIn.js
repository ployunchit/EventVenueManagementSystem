
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
              src='images/img-9.jpg'
              text='9:00 PM 10/30/22'
              label='Tennis'
              path='/register'
            />
            <CardItem
              src='images/img-2.jpg'
              text='3:00 PM 10/31/22'
              label='Skateboarding'
              path='/register'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='5:00 PM 11/3/22'
              label='Volleyball'
              path='/register'
            />
            <CardItem
              src='images/img-4.jpg'
              text='2:00 PM 11/4/22'
              label='Canoeing'
              path='/register'
            />
            <CardItem
              src='images/img-8.jpg'
              text='1:00 PM 11/5/22'
              label='Rock Climbing'
              path='/register'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;