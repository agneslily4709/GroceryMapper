import React from 'react'
import Content from './Content'
import { userContext } from '../App';
import { useContext } from 'react';
import iii from './images/push.gif'
import { useNavigate } from 'react-router-dom';
const Home = (props) => {
        const navigate = useNavigate()
  const { state, dispatch } = useContext(userContext);
  if(state)
  return (
    <div>
          <Content data={props}/>
    </div>
  )
  else return (
    <div className='container home'>
      <p className='welcome'>Stay Home and Shop Online</p>
      <img className='homeimg' src={iii} alt="..."/>
      <br/>
      <button className='btn btn-danger' onClick={()=>navigate("/login")}>      
        <span className='slogan'>SignUp of Login to continue...</span>
        </button>
    </div>
  )
}

export default Home