import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ErrorImg from "../components/images/error.png"

      const Error = () => {
        const navigate = useNavigate()
        useEffect(() => {
                toast("You'll be redirected to the Login Page", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 3000,
                      });
                      setTimeout(()=>{
                        navigate("/login")
                      },3000)
        }, [navigate]);
  return (
        <>
        <div className='error-page'> 
                <img src={ErrorImg} alt='404 Page not found' height="700px" className='error-img'/>
        </div>
        <ToastContainer/>
        </>
  )
}

export default Error