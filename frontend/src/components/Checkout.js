import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ReactStripeCheckout from 'react-stripe-checkout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = (props) => {
  const [confirm,setConfirm] = useState(false);
  const [user,setUser] = useState("")

    let finalCart = props.data.obj;
    let id = 1001;
    const uniqueID = Math.floor(Math.random() * 9000000000) + 1000000000;
    let [total,setTotal] = useState(0)
  let navigate = useNavigate();
  const getCurrentDateTime = () => {
        const now = new Date();
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const date = now.toLocaleDateString(undefined, dateOptions);
        const time = now.toLocaleTimeString(undefined, timeOptions);
        return `Date: ${date} Time: ${time}`;
      };
      const dateTime= getCurrentDateTime()

const handleButton = ()=> {
        console.log(props)
  if(confirm){
        props.data.setCount(0)
        props.data.setObj({})
        navigate('/delivery')
}
  else toast.warning('Complete Payment First !!!',{
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
    })
}
  const onToken = token => {
        toast.success('Payment successful!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
              });
    setConfirm(true)
};
useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("grocery-app-user"))
        if(userInfo) setUser(userInfo.email)
        else navigate("/login")
        total = Object.values(finalCart).reduce((acc, itemData) => {
          const itemTotal = itemData.quantity * itemData.price;
          return acc + itemTotal;
        }, 0);
    setTotal(total);
}, [finalCart]);
  return (
  <>
    <div className='tableClass container'>
        <p className='checkout-title'>Grocery Mapper</p>
        <div className='checkout-details'>
        <p>Bill No.{uniqueID}</p>
        <p>{dateTime}</p>
        <p>Customer Email: {user}</p>
        </div>
        <table className='table checkout-table'>
  <thead>
    <tr className='table-primary'>
    <th scope='col'>Item No.</th>
      <th scope='col'>Item Name</th>
      <th scope='col'>Quantity</th>
      <th scope='col'>Price</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
  {Object.entries(finalCart).map(([itemName, itemData]) => {
  return (
    <tr className='table-success' scope="row" key={itemName}>
        <td>{id++}</td>
      <td>{itemData.name}</td>
      <td>{itemData.quantity}</td>
      <td>${parseFloat(itemData.price).toFixed(2)}</td>
      <td>${(itemData.quantity * itemData.price).toFixed(2)}</td>
    </tr>
  );
})}

  </tbody>
</table>

        <p>Total Amount : {total}</p>
        {(total>0) ? 
(        <div className='buttons'>
        <ReactStripeCheckout
                        stripeKey="pk_test_51Lg6rsSEs239vqD1d4XOcIGjlmp4lGpr6mPYvdtjK6qcA460RZHVz8hvToHVY1FtNEn0JsDPBVHH6AfybjIoaGvu00yUrVBLLr"
                        amount={total*100}
                        description={`Your total is Rs. ${total}`}
                        panelLabel='Pay Now'
                        name="Grocery Items"
                        billingAddress
                        shippingAddress
                        token={onToken}
                        >
                                <button className="btn btn-secondary me-2">Pay now</button>
                                </ReactStripeCheckout>  
                        <br/>
                        <button className='btn btn-warning ms-2' onClick={handleButton}>Delivery Slot</button>
        </div>)
        :<>
        <div className='checkout-warning'>
                <p>Cart is Empty. Please, add items to cart before checking out.</p>
                <button className='btn btn-outline-info btn-lg'>Check items</button>
        </div>
        </>}
    </div>
    <ToastContainer />
  </>

  )
}

export default Checkout