import React from 'react'
import Content from './Content'
import { userContext } from '../App';
import { useContext } from 'react';
import iii from './images/push.gif'
const Home = (props) => {
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
      <a className='btn btn-danger' href='/login'>      
        <span className='slogan'>SignUp of Login to continue...</span>
        </a>
    </div>
  )
}

export default Home