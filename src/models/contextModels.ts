import { Product } from "./product";

export type State = {
   products: Product[];
   selectedProducts: Product[];
   loading: boolean;
   error: string | null;
   checkConfirmOrder: boolean;
};

export type Action = {
   type: string;
   payload: any;
}
