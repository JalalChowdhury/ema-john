import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import Cart from '../Cart/Cart';


import './Shop.css'


const Shop = () => {

    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);

    useEffect(()=>{
        fetch("./products.JSON")
           .then(res => res.json())
           .then(data => setProducts(data));
    },[])

    const handleAddToCart = (product) =>{
        const newCart = [...cart,product];
        setCart(newCart);
    }

    return (
        <div className="shop-container">
            <div className="product-container">

                   
                    {
                         products.map(product => <Products
                            key = {product.key}
                            product = {product}
                            handleAddToCart = {handleAddToCart}
                         
                         ></Products> )

                    
                    }
            </div>
            <div className="cart-container">
                   <Cart
                        cart = {cart}
                   ></Cart>
            </div>
            
        </div>
    );
};




// product  component 
function Products(props){

    // console.log(props)
    const {name, img ,seller ,price, stock} = props.product;
    const cartIcon = <FontAwesomeIcon icon={faShoppingCart} />

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
                  <button 
                    onClick={ () => props.handleAddToCart(props.product)}
                    className="btn-regular"
                   >{cartIcon}add to cart</button>
               </div>
            </div>
        </div>
    )
}

export default Shop;