import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Product } from '../../models/product';
import { Observable, Subject } from 'rxjs';
import { Platform } from 'ionic-angular';

const STORAGE_KEY = 'viewedProducts';

@Injectable()
export class ViewedProductsProvider {

  public updateEvents = new Subject<Product>();
  private readyStorage: Observable<NativeStorage>;

  constructor(private storage: NativeStorage,
    private platform: Platform) {
    this.readyStorage = Observable.fromPromise(this.platform.ready()).map(r => this.storage);
    console.log('ViewedProductsProvider Provider constructed');

  }


  isViewed(product: Product): Observable<boolean> {
    return this.getAllViewed().map(result => {
      return result && result.indexOf(product) !== -1;
    });
  }

  addViewed(product: Product) {
    console.log("adding a product to viewed", product);
    return this.getAllViewed().flatMap(result => {
      console.log("updating all viewed" + result);
      if (result) {
        result.push(product);
        return this.setAndNotify(result);
      } else {
        return this.setAndNotify([product]);
      }
    }).subscribe();
  }

  addViewedUnique(product: Product) {
    console.log("adding a product to viewed without redundancy", product);
    return this.getAllViewed().subscribe(result => {
      if (result) {
        // produc already in the list
        if (result.indexOf(product) != -1) {
          return Observable.of(product);
        }
        result.push(product);
        return this.setAndNotify(result);
      } else {
        return this.setAndNotify([product]);
      }
    });
  }



  removeViewed(product: Product) {
    console.log("removing a product from viewed", product);
    return this.getAllViewed().subscribe(result => {
      // send a notification
      if (result) {
        var index = result.indexOf(product);
        result.splice(index, 1);
        return this.setAndNotify(result)
      }
    });
  }

  getAllViewed(): Observable<Product[]> {
    console.log("retrieveing all stored product");
    return this.readyStorage.flatMap(r => {
      return Observable.fromPromise(this.storage.getItem(STORAGE_KEY))
    })
  }


  setAndNotify(value: Product[]): Observable<any> {
    console.log('setting value to storage', value);
    return this.readyStorage.flatMap(r => {
      console.log('storage is ready', r);
      return Observable.fromPromise(
        this.storage.setItem(STORAGE_KEY, value).
          then(
            e => {
              console.debug('setting value to storage success');
              // publish an update event
              this.updateEvents.next(e)
              console.debug('update event generated');
            }).
          catch(err => console.error(err)));
    });
  }
}

