import React from 'react';
import './Cart.css';
const Cart = (props) => {

    const { cart } = props;
    // let total =0;
    // for(const product of cart){
    //     total = total + product.price;
    // }
    
    const total = cart.reduce((previous,product) => previous + product.price,0);

    let shipping = 15;
    let tax = parseFloat((total*0.05).toFixed(2));
    

    
    return (
        <div style={{backgroundColor:"gray",margin:'5px',padding:'10px',borderRadius:'10px'}}>
            <h3>Order Summary</h3>
            <h5>Items Ordered : {props.cart.length}</h5>
            <h5>Price : {total}</h5>
            <h5>Shipping : {shipping}</h5>
            <h5>Tax : {tax}</h5>
            <h4 style={{color:"blue"}}>Grand Total : {parseFloat((total+tax+shipping).toFixed(2))}</h4>
            <button style={{backgroundColor:"orange",border:'none',padding:'15px',fontWeight:'700',borderRadius:'8px'}}>Order</button>
        </div>
    );
};

export default Cart;