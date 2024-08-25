import { useConfirmOrderContext } from "../hooks/useConfirmOrderContext";
import ConfirmOrderItem from "./ConfirmOrderItem";

function ConfirmOrderSection() {
  const { confirmOrder, products } = useConfirmOrderContext();
  return (
    <div className="confirm-order-section">
      <h2>Confirm Order</h2>
      <p>Please review your order details below:</p>
      <div className="Bought-products">
        {products.map((product) => (
          <ConfirmOrderItem product={product} key={product.id} />
        ))}
      </div>
      <button className="confirm-order-button" onClick={() => confirmOrder()}>
        Start New Order
      </button>
    </div>
  );
}

export default ConfirmOrderSection;
