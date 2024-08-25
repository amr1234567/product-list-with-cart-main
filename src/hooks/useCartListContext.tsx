import { useContext } from "react";
import ProductsContext from "../context/useProductsContext";

export const useCartListContext = () => {
  const {
    state: { selectedProducts },
    emptyQuantity,
    checkConfirmOrder,
  } = useContext(ProductsContext);
  return { products: selectedProducts, emptyQuantity, checkConfirmOrder };
};
