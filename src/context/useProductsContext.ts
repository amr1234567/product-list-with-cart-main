import { createContext, useEffect, useReducer } from "react";
import { Product } from "../models/product";
import { ActionConstants } from "../constants/actionTypes";
import { Action, State } from "../models/contextModels";
import { objectToProduct } from "../helpers/convertingFunctions";

function reducer(state: State, action: Action): State {
   console.log(state, action)
   switch (action.type) {
      case ActionConstants.FETCH_PRODUCTS:
         return { ...state, loading: true, error: null };
      case ActionConstants.FETCH_PRODUCTS_SUCCESS:
         return { ...state, loading: false, products: action.payload };
      case ActionConstants.FETCH_PRODUCTS_ERROR:
         return { ...state, loading: false, error: action.payload };
      case ActionConstants.INCREMENT_ITEM: {
         const newProducts = state.products.map((p) => {
            if (p.id === action.payload.id) {
               return { ...p, quantity: ++p.quantity } as Product;
            }
            return p;
         });
         const selectedProducts = newProducts.filter((p) => p.quantity > 0);
         console.log({ ...state, products: newProducts, selectedProducts })
         return { ...state, products: newProducts, selectedProducts };
      }
      case ActionConstants.DECREMENT_ITEM: {
         const newProducts = state.products.map((p) => {
            if (p.id === action.payload.id) {
               return { ...p, quantity: p.quantity-- } as Product;
            }
            return p;
         });
         const selectedProducts = newProducts.filter((p) => p.quantity > 0);
         return { ...state, products: newProducts, selectedProducts };
      }
      case ActionConstants.EMPTY_QUANTITY_ITEM: {
         const newProducts = state.products.map((p) => {
            if (p.id === action.payload.id) {
               return { ...p, quantity: 0 } as Product;
            }
            return p;
         });
         const selectedProducts = newProducts.filter((p) => p.quantity > 0);
         return { ...state, products: newProducts, selectedProducts };
      }
      case ActionConstants.CHECK_CONFIRM_ORDER: {
         return { ...state, checkConfirmOrder: true };
      }
      case ActionConstants.CONFIRM_ORDER_SUCCESS: {
         const products = state.products.map((p) => { return { ...p, quantity: 0 } as Product; });
         return { ...state, checkConfirmOrder: false, selectedProducts: [], products };
      }

      default:
         return state;
   }
}


export const useProductsReducers = (initialState: State) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      const controller = new AbortController(); // Create an AbortController instance
      const signal = controller.signal; // Extract the signal f
      dispatch({ type: ActionConstants.FETCH_PRODUCTS } as Action);
      fetch("/data.json", { signal }).then(res => res.json())
         .then(products => {
            dispatch({ type: ActionConstants.FETCH_PRODUCTS_SUCCESS, payload: products.map((product: any) => objectToProduct(product)) });
            console.log("products fetched")
         }).catch(err => {
            if (err.name !== 'AbortError') { // Ignore abort errors
               dispatch({ type: ActionConstants.FETCH_PRODUCTS_ERROR, payload: err.message });
            }
         })
      return () => {
         controller.abort(); // Abort the fetch request when the component unmounts
      };
   }, []);

   const incrementQuantity =
      (id: number) => {
         dispatch({ type: ActionConstants.INCREMENT_ITEM, payload: { id } });
         console.log("incrementQuantity")
      }
   const decrementQuantity =
      (id: number) => {

         dispatch({ type: ActionConstants.DECREMENT_ITEM, payload: { id } })
         console.log("decrementQuantity")
      }

   const emptyQuantity =
      (id: number) => dispatch({ type: ActionConstants.EMPTY_QUANTITY_ITEM, payload: { id } })
      ;
   const checkConfirmOrder = () => dispatch({ type: ActionConstants.CHECK_CONFIRM_ORDER, payload: undefined })

   const confirmOrder = () => dispatch({ type: ActionConstants.CONFIRM_ORDER_SUCCESS, payload: undefined });
   return { state, incrementQuantity, decrementQuantity, emptyQuantity, checkConfirmOrder, confirmOrder };
};

export const initialState: State = {
   products: [],
   selectedProducts: [],
   loading: false,
   error: null,
   checkConfirmOrder: false,
};

export const initProviderState: useProductsContextType = {
   incrementQuantity: () => { },
   decrementQuantity: () => { },
   emptyQuantity: () => { },
   checkConfirmOrder: () => { },
   confirmOrder: () => { },
   state: initialState
};



export type useProductsContextType = ReturnType<typeof useProductsReducers>;
const ProductsContext = createContext<useProductsContextType>(initProviderState);
export default ProductsContext;
