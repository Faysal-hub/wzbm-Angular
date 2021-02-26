import { ShoppingCartItem } from "./shopping-cart-item";


export interface ShoppingCart {
    items: ShoppingCartItem[];

    // get totalItemsCount(){
    //    let count = 0;
    //    for (const productId in this.items) {
    //      count += this.items[productId].quantity;
    //      return count
    //    }
    // }
}