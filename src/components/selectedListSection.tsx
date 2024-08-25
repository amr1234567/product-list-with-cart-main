import { useEffect, useRef } from "react";
import CartTile from "./cartTile";
import { useCartListContext } from "../hooks/useCartListContext";

const SelectedListSection = () => {
  const { products, checkConfirmOrder } = useCartListContext();
  const totalPrice = useRef(0);
  useEffect(() => {
    totalPrice.current = products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }, [products]);

  return (
    <div className="product-selected-list">
      <h2>
        Your Cart (<span>0</span>)
      </h2>
      {products.length > 0 ? (
        <div className="confirm-order-container">
          <div className="list-of-selected-products-section">
            {products.map((product) => (
              <CartTile product={product} key={product.id} />
            ))}
          </div>
          <div className="total-order-price">
            <span className="title">Order Total</span>
            <span className="price">{totalPrice.current.toFixed(2)}</span>
          </div>
          <div className="description">
            <img src="/assets/images/icon-carbon-neutral.svg" alt="carbon" />
            <p>
              This is a <span>carbon-neutral</span> delivery
            </p>
          </div>
          <button
            className="confirm-order-button"
            onClick={() => checkConfirmOrder()}
          >
            Confirm Order
          </button>
        </div>
      ) : (
        <div className="default">
          <img src="assets/images/illustration-empty-cart.svg" alt="" />
          <p>Your added items will appear here</p>
        </div>
      )}
    </div>
  );
};

export default SelectedListSection;
