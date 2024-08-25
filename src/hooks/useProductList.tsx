import { useContext } from "react";
import ProductsContext from "../context/useProductsContext";

export const useProductList = () => {
  const {
    state: { products, loading, error, checkConfirmOrder },
    incrementQuantity,
    decrementQuantity,
  } = useContext(ProductsContext);
  return {
    products,
    error,
    loading,
    checkConfirmOrder,
    incrementQuantity,
    decrementQuantity,
  };
};
