import { Product } from "../models/product";

export const objectToProduct = (obj: any): Product => {
   return {
      category: obj.category,
      image: {
         desktop: obj.image.desktop,
         mobile: obj.image.mobile,
         tablet: obj.image.tablet,
         thumbnail: obj.image.thumbnail,
      },
      name: obj.name,
      price: obj.price,
      id: obj.id,
      quantity: 0
   } as Product;
};
