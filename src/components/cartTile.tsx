import { useEffect, useRef } from "react";
import { Product } from "../models/product";
import { useCartListContext } from "../context/useProductsContext";

function CartTile({ product }: Readonly<{ product: Product }>) {
  const { emptyQuantity } = useCartListContext();
  const totalPrice = useRef(product.price);
  useEffect(() => {
    totalPrice.current = product.price * product.quantity;
  }, [product.quantity, product.price]);
  return (
    <div className="cart-item" data-product-id="${product.productDetails.id}">
      <div className="details">
        <p className="name">{product.name}</p>
        <div className="numeric-details">
          <span className="quantity">{product.quantity}×</span>
          <span className="additional-decoration-and-price">
            <span className="additional-decoration-inner">@</span>
            <span className="price">${product.price.toFixed(2)}</span>
          </span>
          <span className="total-price">${totalPrice.current.toFixed(2)}</span>
        </div>
      </div>
      <button
        className="empty-button"
        onClick={() => emptyQuantity(product.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 10 10"
        >
          <path
            fill="#CAAFA7"
            d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
          />
        </svg>
      </button>
    </div>
  );
}

export default CartTile;
