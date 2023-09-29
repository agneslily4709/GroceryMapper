import { useContext } from 'react';
import {React,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {userContext} from "../App"
import '../index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {
  const {state,dispatch} = useContext(userContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const loginUser =async (e)=>{
    e.preventDefault();
    if(email === "" || password === ""){
        toast.error("Missing credentials: mail or password",{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
            })
    }
    else{
    const res =await  fetch(`https://grocery-mapper-be.onrender.com/api/login`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'include',
      body:JSON.stringify({  email,  password})
    });
    localStorage.setItem("grocery-app-user",JSON.stringify({email}))
    const data = await res.json();
    console.log("error",res.data.error)
    if(res.status === 400 || !data){
      toast.error("Invalid Credentials",{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
      })
    }else{
        toast.success("Login Successful",{
                position: toast.POSITION.TOP_LEFT,
                autoClose: 1000,
        })
      dispatch({type:"USER",payload:true});
      props.data.setIsLoggedIn(true)
      navigate('/');
    }        
    }

 }
  return (
   <>
<div className='form-container'>
    <form method='POST' className='form-component'>
    <p className='form-title'>Login Form</p>
        <input
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Enter your Mail"
            type="email"
            value={email}
            name="mail"
            required
        />
        <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            type="password"
            value={password}
            name="password"
            required
        />
            <button className='w-100 btn btn-danger' value="login" onClick={loginUser}>Login</button>
            <div className='buttons'>
          <p className='me-2'>Don't have an account ?</p><a className='ms-2 btn btn-primary' href='/signup'>SignUp</a>
          </div>
    </form>
    </div>
    <ToastContainer/>
   </>
  )
}

export default Login