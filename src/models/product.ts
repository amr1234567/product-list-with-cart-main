export interface ProductImage {
   thumbnail: string;
   mobile: string;
   tablet: string;
   desktop: string;
}

export interface Product {
   id: number;
   image: ProductImage;
   name: string;
   category: string;
   price: number;
   quantity: 0;
}
