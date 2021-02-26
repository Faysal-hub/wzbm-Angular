import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { map, switchMap } from 'rxjs/operators';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {
    
    productService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((action) => {
            const key = action.payload.key;
            const data = { key, ...(action.payload.val() as Product) };
            return data;
          })
        )
      )
      .pipe(
        switchMap((products) => {
          this.products = products;
          return route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');

        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .snapshotChanges()
      .subscribe(cart => this.cart = cart.payload.val());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
