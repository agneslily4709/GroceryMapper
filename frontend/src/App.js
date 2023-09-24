import React , {useState,createContext,useReducer} from 'react';
import {initialState,reducer} from './reducer/UseReduer';
import Navbar from './components/Navbar';
import Profile from './components/Profile'
import Signup from './components/Signup';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Delivery from './components/Delivery';
import Confirmed from './components/Confirmed';
import Logout from './components/Logout';
import Error from './components/Error';

export const userContext = createContext();
const Routing = () =>{
  const [count,setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let [obj,setObj] = useState({});
  return (
  <BrowserRouter>
  <Navbar data={{count,setCount}}/>
  <Routes>
    <Route exact path='/' element={<Home data={{count,setCount,obj,setObj}}/>}/>
        <Route exact path="/signup" element={<Signup />}/> 
        <Route exact path="/login" element={<Login data={{isLoggedIn, setIsLoggedIn}}/>}/>
        {isLoggedIn ? 
        <>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/checkout' element={<Checkout data={{count,setCount,obj,setObj}}/>}/>
        <Route path='/delivery' element={<Delivery/>}/>
        <Route path='/confirmed' element={<Confirmed/>}/>
        <Route path='/logout' element={<Logout/>}/>
        </>
        :<></>}
<Route path='*' element={<Error/>}/>
  </Routes>
  </BrowserRouter>
  )
}

const  App = () =>{
const [state,dispatch] = useReducer(reducer,initialState);

  return (
    <>
    <userContext.Provider value={{state,dispatch}}>
    <Routing />
    </userContext.Provider>
    </> 
  );
}

export default App;
