import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class CategoryService {
  observableCategories$: Observable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.observableCategories$ = this.db
      .list('/categories', (ref) => ref.orderByChild('name'))
      .snapshotChanges();
  }
  getCategories() {
    return this.observableCategories$.pipe(
      map((changes) => {
        return changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }
}
