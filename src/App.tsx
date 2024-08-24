import "./App.css";
import ProductItem from "./components/productItem";
import { useProductList } from "./context/useProductsContext";
import SelectedListSection from "./components/selectedListSection";
import ConfirmOrderSection from "./components/confirmOrderSection";
// import { useEffect } from "react";

function App() {
  const { products, loading, checkConfirmOrder } = useProductList();
  // useEffect(() => {
  //   if (checkConfirmOrder) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [checkConfirmOrder]);
  return (
    <>
      {checkConfirmOrder && (
        <>
          <div className="overlay"></div>
          <ConfirmOrderSection />
        </>
      )}
      <div className="main">
        <div id="product-list-container">
          {loading ? (
            <p>Loading</p>
          ) : (
            products.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))
          )}
        </div>
        <SelectedListSection />
      </div>
    </>
  );
}

export default App;
