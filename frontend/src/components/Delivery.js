import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'
const Delivery = () => {
  let navigate = useNavigate();

    let slots = [
        {
            id:1,
            name:"Morning Slot",
            startTime:9,
            endTime:12
        },
        {
            id:2,
            name:"Afternoon Slot",
            startTime:12,
            endTime:15 
        },
        {
            id:3,
            name:"Evening slot",
            startTime:15,
            endTime:18
                
        },
        {
            id:4,name:"Night slot",
                startTime:18,
                endTime:21
        },
    ]
  return (
    <div className='container delivery' style={{marginTop:"80px",textAlign:"center"}}>
        <p>Please select your preferrable delivery slot</p>
        <div className='group'>
        {slots && slots.map((slot,index) => (
           <div className="card proCard" key={index} style={{borderRight:"4px solid red",borderLeft:"4px solid red",borderBottom:"4px solid red"}}>
           <div className="card-header bg-primary">
           </div>
           <div className="card-body">
             <p className="card-title">{slot.name}</p>
             <p className="card-text">Time : {`${slot.startTime}-${slot.endTime}`}</p>
             <button className='btn btn-success' onClick={() =>navigate('/confirmed')}>Book Slot</button>
           </div>
         </div>
        ))}      
        </div>
    </div>
  )
}

export default Delivery