import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharingDataService {
  private idSubject = new Subject<number>();
  private addToCartSubject = new Subject<Product>();

  id$ = this.idSubject.asObservable();
  addToCart$ = this.addToCartSubject.asObservable();

  setId(id: number) {
    this.idSubject.next(id);
  }

  setAddToCart(product: Product) {
    this.addToCartSubject.next(product);
  }

  /** 
   ** code using event emitter not recommended for parallel components
   ** its recommended to use for parent and child components

    private _idProductEventEmitter: EventEmitter<number> =
      new EventEmitter<number>();
  
  
    get idProductEventEmitter(): EventEmitter<number> {
      return this._idProductEventEmitter;
    }
 

    private _addToCartEmitter: EventEmitter<Product> =
      new EventEmitter<Product>();

    get addToCartEmitter(): EventEmitter<Product> {
    return this._addToCartEmitter;
    }
  */
}
