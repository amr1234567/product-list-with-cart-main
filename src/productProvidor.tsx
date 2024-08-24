import { ReactNode } from "react";
import ProductsContext, {
  initialState,
  useProductsReducers,
} from "./context/useProductsContext";

const ProductProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ProductsContext.Provider value={useProductsReducers(initialState)}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductProvider;
