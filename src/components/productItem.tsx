import { Product } from "../models/product";
import icon from "../../assets/images/icon-add-to-cart.svg";
import { useProductList } from "../context/useProductsContext";
function ProductItem({ product }: Readonly<{ product: Product }>) {
  const { decrementQuantity, incrementQuantity } = useProductList();
  return (
    <div data-product-id={product?.id} className="cart">
      <div className="img-and-add-button">
        <img src={product?.image.desktop} alt={product?.name} />
        {product?.quantity == 0 ? (
          <button
            className="add-button"
            onClick={() => incrementQuantity(product.id)}
          >
            <img src={icon} alt="" />
            <span>Add to Cart</span>
          </button>
        ) : (
          <div className="increment-and-decrement-quantity">
            <button
              className="decrement-button"
              onClick={() => decrementQuantity(product?.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="2"
                fill="none"
                viewBox="0 0 10 2"
              >
                <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
              </svg>
            </button>
            <span>{product?.quantity}</span>
            <button
              className="increment-button"
              onClick={() => incrementQuantity(product?.id)}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  fill="#fff"
                  d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                />
              </svg>{" "}
            </button>
          </div>
        )}
      </div>
      <div className="content">
        <p className="category">{product?.category}</p>
        <p className="name">{product?.name}</p>
        <p className="price">${product?.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ProductItem;
