import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})

export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(
    private auth: AuthService, 
    private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit(){
     this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

     let cart$ = await this.shoppingCartService.getCart();
     cart$.snapshotChanges().subscribe(cart => {
       this.shoppingCartItemCount = 0;
       const items = cart.payload.val().items;
      //  console.log(items);
       for (const productId in items) {
         this.shoppingCartItemCount += items[productId].quantity;
       }
     });
  }

  logout() {
    this.auth.logout();
  }

}

