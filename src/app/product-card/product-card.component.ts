import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  getQuantity(){
    // console.log(this.shoppingCart);
    if (!this.shoppingCart) return 0;

    // console.log(this.shoppingCart);

    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }
}
