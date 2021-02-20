import { take } from 'rxjs/operators';
import { Product } from './models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string){
    return this.db.object(
      '/shopping-carts' + cartId + '/items' + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts' + cartId + '/items' + product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.$exists()) item$.update({ quantity: item.quantity + 1 });
      else item$.set({ product: product, quantity: 1 });
    });
  }

  // async addToCart(product: Product) {
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.getItem(cartId, product.key);

  //   item$
  //     .snapshotChanges()
  //     .pipe(take(1))
  //     .subscribe((item: any) => {
  //     item$.update({ product: product, quantity: (item.quantity || 0) + 1 });
  //     });
  // }

  // async addToCart(product) {
  //   //here we add the cart to firebase

  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.db.object(
  //     '/shopping-carts/' + cartId + '/items/' + product.key
  //   );

  //   item$
  //     .snapshotChanges()
  //     .pipe(take(1))
  //     .subscribe((item: any) => {
  //       if (item.payload.val())
  //         item$.update({ quantity: item.payload.val().quantity + 1 });
  //       else item$.set({ product: product.payload.val(), quantity: 1 });
  //     });
  // }

  // async addToCart(product) {
  //   //here we add the cart to firebase

  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.db.object(
  //     '/shopping-carts/' + cartId + '/items/' + product.key
  //   );

  //   item$
  //     .snapshotChanges()
  //     .pipe(take(1))
  //     .subscribe((item: any) => {
  //       if (item.payload.val())
  //         item$.update({ quantity: item.payload.val().quantity + 1 });
  //       else item$.set({ product: product, quantity: 1 });
  //     });
  // }

  //   async addToCart(product: Product){
  //     let cartId = await this.getOrCreateCartId();
  //     let itemRef = this.db.object('/shopping-carts/'+cartId+'/items/'+product.key);
  //     let item$ = itemRef.snapshotChanges();
  //     item$.pipe(take(1)).subscribe(item=>{
  //       if(item.payload.exists()) itemRef.update({quantity: item.payload.val()['quantity']+1});
  //       else itemRef.set({product:product, quantity:1});
  //     })
  // }
}



// import { take } from 'rxjs/operators';
// import { Product } from './models/product';
// import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/database';

// @Injectable({
//   providedIn: 'root',
// })
// export class ShoppingCartService {
//   constructor(private db: AngularFireDatabase) {}

//   private create() {
//     return this.db.list('/shopping-carts').push({
//       dateCreated: new Date().getTime(),
//     });
//   }

//   private async getOrCreateCardId() {
//     const cartId = localStorage.getItem('cartId');
//     if (cartId) {
//       return cartId;
//     }

//     const result = await this.create();
//     localStorage.setItem('cartId', result.key);
//     return result.key;
//   }

//   private getCart(cartId: string) {
//     return this.db.object('/shopping-carts/' + cartId);
//   }

//   private getItem(cartId: string, productId: string) {
//     return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
//   }

//   // public async addToCart(product: Product ) {
//   //   const cartId = await this.getOrCreateCardId();
//   //   let item$ = this.getItem(cartId, product.key);

//   //   item$
//   //     .snapshotChanges()
//   //     .pipe(take(1))
//   //     .subscribe((i) => {
//   //       item$.update({
//   //         product: product,
//   //         quantity: i.payload.hasChild('quantity')
//   //           ? i.payload.val()['quantity'] + 1
//   //           : 1,
//   //       });
//   //     });
//   // }

//  async addToCart(product: Product) {
//     const cartId = await this.getOrCreateCardId();
 
//     let item$ = this.getItem(cartId, product.key);
//     item$.snapshotChanges()
//       .pipe(take(1))
//       .subscribe(i => {        
//         item$.update({
//           product: product,
//           quantity: ((i.payload.hasChild('quantity')) ? i.payload.val()['quantity'] + 1 : 1)
//         });
//       });
// }
// }