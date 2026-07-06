import { formatMoney } from '../../utils/money';
import axios from 'axios';
import { useState } from 'react';

export function CartItemDetails({ cartItem, loadCart }) {

  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateQuantity = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity : Number(quantity)
    });
    await loadCart();
    setIsUpdating(!isUpdating);
  }
  const quantityInput = (event) => {
    setQuantity(event.target.value);
  }
  const handleQuantityKeydown = (event) => {
    const keyPressed = event.key;
    if(keyPressed === 'Enter'){
      updateQuantity();
    }
    else if(keyPressed === 'Escape'){
      setQuantity(cartItem.quantity);
      setIsUpdating(false);
    }
  }

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.product.id}`);
    await loadCart();
  }
  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: {isUpdating ? 
            <input type="text" className="quantity-textbox" value={quantity} onChange={quantityInput} onKeyDown={handleQuantityKeydown} /> : <span className="quantity-label">{cartItem.quantity}</span>}
          </span>
          <span className="update-quantity-link link-primary" onClick={updateQuantity} >
            Update
          </span>
          <span className="delete-quantity-link link-primary" onClick={deleteCartItem} >
            Delete
          </span>
        </div>
      </div>
    </>

  );
}