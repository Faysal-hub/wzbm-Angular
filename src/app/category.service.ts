import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class CategoryService {
  observableCategories$: Observable<any[]>;
  constructor(private db: AngularFireDatabase) {
     this.observableCategories$ = this.db
       .list('/categories', (ref) => ref.orderByChild('name'))
       .valueChanges();
  }
  getCategories() {
     return this.observableCategories$;
  }
}
