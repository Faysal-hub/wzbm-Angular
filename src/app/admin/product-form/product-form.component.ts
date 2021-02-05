import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(
    categoryService: CategoryService,
    private productService: ProductService,
  ) {
    this.categories$ = categoryService.getCategories();
    console.log(this.categories$);
  }

  save(product) {
    // if (this.id) this.productService.update(this.id, product);
    this.productService.create(product);

    // this.router.navigate(['/admin/products']);
    console.log(product);
  }

  ngOnInit(): void {}
}
