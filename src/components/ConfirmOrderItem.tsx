import { useEffect, useRef } from "react";
import { Product } from "../models/product";

function ConfirmOrderItem({ product }: Readonly<{ product: Product }>) {
  const totalPrice = useRef(product.price);
  useEffect(() => {
    totalPrice.current = product.price * product.quantity;
  }, [product.quantity]);
  return (
    <div className="confirm-order-item">
      <div className="left-side">
        <img src={product.image.thumbnail} alt={product.name} />
        <div className="information">
          <p className="name">{product.name}</p>
          <div className="quantity-and-price">
            <span className="quantity">{product.quantity}×</span>
            <span className="price">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="right-side">${totalPrice.current.toFixed(2)}</div>
    </div>
  );
}

export default ConfirmOrderItem;
