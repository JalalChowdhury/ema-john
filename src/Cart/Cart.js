import React from 'react';
import './Cart.css';
const Cart = (props) => {

    const { cart } = props;

    // console.log(cart.hero,6);
    let total =0;
    let totalQuantity = 0;

    for(const product of cart){
        product.quantity = !product.quantity ? 1 :product.quantity;

        total = total + product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity ;
    }
    
    // const total = cart.reduce((previous,product) => previous + product.price,0);

    let shipping = total>0 ? 15:0;
    let tax = parseFloat((total*0.05).toFixed(2));
    

    
    return (
        <div style={{backgroundColor:"#f0f2f5",margin:'5px',padding:'10px',borderRadius:'10px'}}>
            <h3>Order Summary</h3>
            <h5>Items Ordered : {totalQuantity}</h5>
            <h5>Price : {total.toFixed(2)}</h5>
            <h5>Shipping : {shipping}</h5>
            <h5>Tax : {tax}</h5>
            <h4 style={{color:"blue"}}>Grand Total : {parseFloat((total+tax+shipping).toFixed(2))}</h4>
            <button style={{backgroundColor:"orange",border:'none',padding:'15px',fontWeight:'700',borderRadius:'8px'}}>Order</button>
        </div>
    );
};

export default Cart;