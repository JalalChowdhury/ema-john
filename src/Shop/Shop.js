import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {addToDb, getStoredCart} from  "../utilities/fakedb"

import Cart from '../Cart/Cart';


import './Shop.css'
import Rating from 'react-rating';
import { Link } from 'react-router-dom';


const Shop = () => {

    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);


    const [displayProducts, setDisplayProducts] = useState([]);

    useEffect(()=>{
        fetch("./products.JSON")
           .then(res => res.json())
           .then(data => {
               setProducts(data)
               setDisplayProducts(data);
               
           });
               
           
    },[])
    //2nd part
    useEffect(() =>{

       if(products.length){

            const saveCart =getStoredCart();
            const storedCart = [];
            for(const key in saveCart){
                const addedProduct = products.find(product => product.key === key);
                if(addedProduct){
                    const quantity = saveCart[key];
                    addedProduct.quantity = quantity ;
                    storedCart.push(addedProduct);
                }
            }
            setCart(storedCart);
       }
    },[products])

    const handleAddToCart = (product) =>{
        const exists =cart.find(pd => pd.key === product.key);
        let newCart = [];
        if(exists){
            const rest = cart.filter(pd=> pd.key !==product.key);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest,product];

        }
        else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        // const newCart = [...cart,product];
        setCart(newCart);
        // 2nd part for local storage added
        addToDb(product.key);
    }

    const handleSearch = event =>{
        const searchText = event.target.value;
        // console.log(searchText);
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchedProducts);
        console.log(matchedProducts.length);
    }

    // Return shop related

    return (
        <div>
            <div className="search-container">

                    <input type="text" onChange={handleSearch} name="" id="" placeholder="search a product name ..."/>
            </div>
            <div className="shop-container">
                <div className="product-container">

                    
                        {
                            //  products.map replace  displayProducts.map
                            displayProducts.map(product => <Products
                                key = {product.key}
                                
                                product = {product}
                                handleAddToCart = {handleAddToCart}
                            
                            ></Products> )

                        
                        }
                </div>
                <div className="cart-container">
                    <Cart cart = {cart} >
                        <Link to="/review">
                            <button className="btn-regular">Review Your Order</button>
                        </Link>
                    </Cart>
                </div>
            
            </div>
        </div>
    );
};










// product  component 
function Products(props){

    // console.log(props)
    const {name, img ,seller ,price, stock,star} = props.product;
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
                  <Rating
                      initialRating={star}
                      emptySymbol="far fa-star icon-color"
                      fullSymbol="fas fa-star icon-color"
                      readonly
                  ></Rating><br/>
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