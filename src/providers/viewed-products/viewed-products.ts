import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Product } from '../../models/product';
import { Observable, Subject } from 'rxjs';

const STORAGE_KEY = 'viewedProducts';

@Injectable()
export class ViewedProductsProvider {

  public updateEvents = new Subject<Product>();

  constructor(private storage: NativeStorage) {
    console.log('ViewedProductsProvider Provider constructed');
  }


  isViewed(product: Product): Promise<boolean> {
    return this.getAllViewed().then(result => {
      return result && result.indexOf(product) !== -1;
    });
  }

  addViewed(product: Product): Promise<any> {
    console.log("adding a product to viewed", product);
    return this.getAllViewed().then(result => {
      // publish an update event
      this.updateEvents.next(product);
      if (result) {
        result.push(product);
        return this.storage.setItem(STORAGE_KEY, result);
      } else {
        return this.storage.setItem(STORAGE_KEY, [product]);
      }
    });
  }

  addViewedUnique(product: Product): Promise<any> {
    console.log("adding a product to viewed without redundancy", product);
    return this.getAllViewed().then(result => {
      // emit update event
      this.updateEvents.next(product);
      if (result) {
        // produc already in the list
        if (result.indexOf(product) != -1) {
          return Promise.resolve(product);
        }
        result.push(product);
        return this.storage.setItem(STORAGE_KEY, result);
      } else {
        return this.storage.setItem(STORAGE_KEY, [product]);
      }

    });
  }

  removeViewed(product: Product): Promise<any> {
    console.log("removing a product from viewed", product);
    return this.getAllViewed().then(result => {
      // send a notification
      this.updateEvents.next(null);
      if (result) {
        var index = result.indexOf(product);
        result.splice(index, 1);
        return this.storage.setItem(STORAGE_KEY, result);
      }
    });
  }

  getAllViewed(): Promise<Product[]> {
    return this.storage.getItem(STORAGE_KEY)
      .catch(error => console.log("could not fetch value from storage", STORAGE_KEY, this.storage));
  }
}
