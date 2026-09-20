export type CartItem = {
  id: number;
  cart_id: number;
  product_id: number;
  size: string;
  quantity: number;
  // joined from products
  name: string;
  price: string;
  image_url: string;
};

export type Cart = {
  id: number;
  user_id: number;
  items: CartItem[];
};
