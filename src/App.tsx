import "./App.css";
import ProductItem from "./components/productItem";
import { useProductList } from "./context/useProductsContext";
import SelectedListSection from "./components/selectedListSection";
import ConfirmOrderSection from "./components/confirmOrderSection";

function App() {
  const { products, loading, checkConfirmOrder } = useProductList();
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
