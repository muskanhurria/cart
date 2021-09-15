import React from 'react';
import CartItem from "./CartItem";

const Cart = (props) => {
    const { products } = props;
    return (
        <div className="cart">
            {products.map((product)=> {
                return (
                <CartItem 
                product={product}        //here product in red is props
                key={product.id} 
                onIncreaseQuantity={props.onIncreaseQuantity}
                onDecreaseQuantity={props.onDecreaseQuantity}
                onHandleDeleteProduct={props.onHandleDeleteProduct}
                />     
                )
            })}
        </div>
    );
}


export default Cart;