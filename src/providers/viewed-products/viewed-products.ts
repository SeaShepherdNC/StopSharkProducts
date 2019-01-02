import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Product } from '../../models/product';

const STORAGE_KEY = 'viewedProducts';

@Injectable()
export class ViewedProductsProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('ViewedProductsProvider Provider conructed');
  }

  isViewed(product: Product): Promise<boolean> {
    return this.getAllViewed().then(result => {
      return result && result.indexOf(product) !== -1;
    });
  }

  addViewed(product: Product): Promise<any> {
    return this.getAllViewed().then(result => {
      if (result) {
        result.push(product);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [product]);
      }
    });
  }

  removeViewed(product: Product): Promise<any> {
    return this.getAllViewed().then(result => {
      if (result) {
        var index = result.indexOf(product);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }

  getAllViewed(): Promise<Product[]> {
    return this.storage.get(STORAGE_KEY);
  }
}
