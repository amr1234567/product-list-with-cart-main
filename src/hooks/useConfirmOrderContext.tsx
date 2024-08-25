import { useContext } from "react";
import ProductsContext from "../context/useProductsContext";

export const useConfirmOrderContext = () => {
  const {
    state: { selectedProducts },
    confirmOrder,
  } = useContext(ProductsContext);
  return { products: selectedProducts, confirmOrder };
};
