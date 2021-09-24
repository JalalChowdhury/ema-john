import React, { useEffect, useState } from 'react';


import './Shop.css'


const Shop = () => {

    const [products,setProducts] = useState([]);

    useEffect(()=>{
        fetch("./products.JSON")
           .then(res => res.json())
           .then(data => setProducts(data));
    },[])

    return (
        <div className="shop-container">
            <div className="product-container">

                   
                    {
                         products.map(product => <Products
                            key = {product.key}
                            product = {product}
                         
                         ></Products> )

                    
                    }
            </div>
            <div className="cart-container">
                    <h3>Order Summary</h3>
                    <h5>Item Ordered : </h5>
            </div>
            
        </div>
    );
};

function Products(props){

    // console.log(props.product)
    const {name, img ,seller ,price, stock} = props.product;
    return(
        <div className='product'>
          
            <div className='image-product'>
                <img src={img} alt="" />
            </div>
            <div className="product-text">
               <div>
                  <h4 className='product-name'>{name}</h4>
                  <p><small>by : {seller}</small></p>
                  <p>Price : {price}</p>
                  <p><small>only {stock} left in stock - order soon</small></p>
                  <button className="btn-regular">add to cart</button>
               </div>
            </div>
        </div>
    )
}

export default Shop;