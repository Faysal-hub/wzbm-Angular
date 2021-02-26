import { ShoppingCartItem } from './shopping-cart-item';

export interface ShoppingCart {
  items: ShoppingCartItem[];

//   get totalItemsCount(){
//       this.shoppingCartItemCount = 0;
//        const items = cart.payload.val().items;
//        for (const productId in items) {
//          this.shoppingCartItemCount += items[productId].quantity;
//        }
//   }
}
