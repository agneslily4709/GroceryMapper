import React from 'react'
import giffy from './images/delivery.gif'
const Confirmed = () => {
  return (
    <div className='confirm'>
        <p className='confirmed-text'>
        Hurray, your order have been confirmed and your slot is booked.
        Green Green Grocery on the way
        </p>
        <img src={giffy} className="imgg" alt="..."/>
    </div>
  )
}

export default Confirmed