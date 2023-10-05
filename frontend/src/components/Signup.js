import {React,useState} from 'react';
import '../index.css';
import {useNavigate} from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({name:"",email:"",password:""})
  let name,value;
  const handleInputs = (e) =>{
      name = e.target.name;
      value=e.target.value;
      setUser({...user,[name]:value});
}

const PostData = async (e) =>{
  e.preventDefault();
  const {name,email,password} = user;

  if(name ==="" || email === "" || password === ""){
        toast.error("Missing credentials: name or mail or password",{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            })
    }
    else{
        const res = await fetch("https://grocery-mapper-be.onrender.com/api/signup",{
                method:"POST",
                headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify({
                  name,email,password
                })
              });
              const data = await res.json();
                if(data){
                    toast.success("Signup successful",{
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 1000,
                  })
                    navigate("/login")
                }
    }
}
  return (
    <>
        <div className='form-container'>
        <form method="POST" className='form-component'> 
        <p className='form-title'>SignUp Form</p>
            <input
                placeholder="Enter your Name"
                type="text"
                value={user.name}
                onChange={handleInputs}
                name="name"
            />
            <input
               onChange={handleInputs}
                placeholder="Enter your Mail"
                type="text"
                value={user.email}
                name="email"
            />
            <input
                onChange={handleInputs}  
                placeholder="Enter your Password"
                type="password"
                value={user.password}
                name="password"
            />


          <button className='w-100 btn btn-danger' value="signup" onClick={PostData}>Signup</button>
          <div className='buttons'>
          <p className='me-2'>Already have account ?</p><a className='ms-2 btn btn-primary text-center' href='/login'>Login</a>
          </div>
    
        </form>
    </div>
        <ToastContainer/>
    </>
  )
}

export default Signup