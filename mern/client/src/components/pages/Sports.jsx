import React, {useState} from 'react'
import './Sports.css';
import SportsCategories from './SportsCategories';

const Sports = () => {

    const[data, setData] = useState(SportsCategories);

    const filterResult = (sport) => {
        const result = SportsCategories.filter((curDate) => {
            return curDate.category === sport;
        });
        setData(result);
    }

  return (
    <>
      <div className="container">
        <div className="row">
            <div className="col">
                <h1 className='title'>Filter by Sports</h1>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <button className='btn' onClick={() => setData(SportsCategories)}>All</button>
                <button className='btn' onClick={() => filterResult('Canoeing')}>Canoeing</button>
                <button className='btn' onClick={() => filterResult('Rock Climbing')}>Rock Climbing</button>
                <button className='btn' onClick={() => filterResult('Skateboarding')}>Skateboarding</button>
                <button className='btn' onClick={() => filterResult('Tennis')}>Tennis</button>
                <button className='btn' onClick={() => filterResult('Volleyball')}>Volleyball</button>
            </div>
            <div className="col">
                <div className="cards">

                    {data.map((values) => {
                        const{id, title, date, image} = values;
                        return (
                            <>
                                <div className="card" key={id}>
                                    <div className="card-header">
                                        <img src={image} alt={title} />
                                    </div>
                                    <div className="card-body">
                                        <h2 className='titleSport'>{title}</h2>
                                        <span className="date">{date}</span>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Sports
