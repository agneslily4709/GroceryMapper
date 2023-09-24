import React from 'react'
import PropTypes from 'prop-types'
import { Link,useNavigate } from 'react-router-dom';
import { userContext } from '../App';
import {FiShoppingCart} from 'react-icons/fi';
import { useContext } from 'react';
export default function Navbar(props) {
    const { state, dispatch } = useContext(userContext);
    let navigate =useNavigate();
    const handleCart =() => {
        navigate('/checkout');
    }
    const RenderMenu=()=>{
        if(state){
            return(
                <>
                <nav class="navbar navbar-expand-lg py-3 fixed-top" style={{backgroundColor:'var(--primary-color)'}}>
                        <div class="container">
                        <a class="navbar-brand brand"  href='/'>Grocery Mapper</a>
                            <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class=" text-light" style={{color:"red"}}>↓↓↓</span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <form className="d-flex">
                        <button  onClick={handleCart} className="btn btn-outline text-light">
                            <strong>Checkout</strong>&nbsp;
                            <FiShoppingCart size={20}/>&nbsp;{props.data.count}
                        </button>
                    </form>
                            <li className="nav-item"><Link className="nav-link navOptions" to="/profile" >Profile</Link></li>
                            <li className="nav-item"><Link className="nav-link navOptions" to="/logout" >Logout</Link></li>
                    </ul>
                    </div>
                </div>
                </nav>
                </>
            )
        }
        if(dispatch){
            return(
                <>
               
                <nav class="navbar navbar-expand-lg py-3 fixed-top"style={{backgroundColor:'var(--primary-color)'}}>
                <div class="container">
                    <a class="navbar-brand brand" href='/'>Grocery Mapper</a>
                    <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class=" text-light" style={{color:"red"}}>↓↓↓</span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item"><Link className="nav-link navOptions" to="/signup"> SignUp </Link></li>
                    <li className="nav-item"><Link className="nav-link navOptions" to="/login" > Login</Link></li>
                    </ul>
                    </div>
                </div>
                </nav>
                </>
            )
        }
    }

    return (
        <>
        
                        <RenderMenu />
                    
        </>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    aboutText: PropTypes.string.isRequired
}

Navbar.defaultProps = {
    title: 'Set title here',
    aboutText: 'About'
  };
