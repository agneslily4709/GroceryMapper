import React, { useEffect, useState } from 'react'
import '../index.css'

const Content = (props) => {
  let myBag = props.data.data.obj
const [data,setData] = useState("");
const handleAddCart = (index) =>{
        const product = {
                name: data[index].item,
                price: data[index].price,
              };
              
              if (product.name in myBag) {
                myBag[product.name].quantity += 1;
              } else {
                myBag[product.name] = {
                  name: product.name,
                  quantity: 1,
                  price: product.price,
                };
              }

              props.data.data.setObj(myBag)
              props.data.data.setCount(prev=> prev+1)

}
    const [text,setText] = useState('')

    const displayItems = async() => {
        try {
            const res =await fetch('https://grocery-mapper-be.onrender.com/api/getItems',{
                method:"GET",
                headers:{
                  "Content-Type":"application/json"
                },
            });
            const Alldata = await res.json();
            setData(Alldata)
            if(!res.status===200){
              const error = new Error (res.error);
              throw error;
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        displayItems();
    },[]);

  return (
    <div className='container'>
    
    <input className='search' type='text' onChange={(e)=>setText(e.target.value)} placeholder='Type any name...'/>

    <div className= 'row content'>
      
        {data && data.filter(item=>item.item.toLowerCase().includes(text)).map((i,idx) => (
          <div className='col-md-4' key={idx}>
        <div className="groceryCard">
              <div className="card-body row">
                <p className='col'  style={{fontSize:"100px"}}>{i.icon}</p>
              <div className='col'>
              <p className="card-title">{i.item}</p>
                <p className="card-text">Type : {i.type}</p>
                <p className='card-text'>Rs. {i.price}</p>
                <button onClick={() => handleAddCart(idx)} className='btn btn-danger'>Add to Cart </button>
              </div>
                </div>
            </div>
            </div>
        ))}
        </div>
        </div>
  )
}

export default Content