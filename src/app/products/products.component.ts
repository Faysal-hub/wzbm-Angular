import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { map, switchMap } from 'rxjs/operators';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,     
  ) {
    productService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((action) => {
            const $key = action.payload.key;
            const data = { $key, ...(action.payload.val() as Product) };
            return data;
          })
        )
      )
      .pipe(switchMap(products =>{
        this.products = products; 
        return route.queryParamMap;
      }))
      .subscribe((params) => {
      this.category = params.get('category');

      this.filteredProducts = this.category
        ? this.products.filter((p) => p.category === this.category)
        : this.products;
    });

    

  }
}
