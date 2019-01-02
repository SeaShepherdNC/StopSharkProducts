import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Product } from '../../models/product';
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable()
export class DataServiceProvider {

    private bannedIngredients: string[] = ['en:rice',
        'fr:riz',
        'fr:requin',
        'en:shark'];

    constructor(public http: Http) { }


    getFoodProduct(isbn: string): Observable<Product> {
        return this.http.get('https://world.openfoodfacts.org/api/v0/product/' + isbn + '.json')
            .map((res: Response) => this.buildProduct(res.json()));
    }

    getBeautyProduct(isbn: string): Observable<Product> {
        return this.http.get('https://world.openbeautyfacts.org/api/v0/product/' + isbn + '.json')
            .map((res: Response) => this.buildProduct(res.json()));
    }


    private buildProduct(payload: any[]) {
        if (payload == undefined || payload['status'] === 0) {
            console.log("Product doesn't exist in database")
            return new Product("Inconnu", false, false, [], "");
        } else if (payload['product'] == undefined || payload['product']['product_name'] == undefined || payload['product']['product_name'].length === 0) {
            console.log("Product malformed")
            return new Product("Inconnu", false, false, [], "");
        }

        let forbiddenIngredients = this.bannedIngredients
            .filter(function(ingredient) {
                return payload['product']['ingredients_tags'].indexOf(ingredient) > -1;
            });

        return new Product(payload['product']['product_name'],
            true,
            forbiddenIngredients.length === 0,
            forbiddenIngredients,
            payload['product']['image_url']);
    }



}
