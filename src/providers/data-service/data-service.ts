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

    constructor(public http: Http) { 
        console.log('constructed DataServiceProvider')
    }


    getFoodProduct(isbn: string): Observable<Product> {
        console.debug('querying food database with ', isbn);
        return this.http.get('https://world.openfoodfacts.org/api/v0/product/' + isbn + '.json')
            .map((res: Response) => this.buildProduct(res.json()));
    }

    getBeautyProduct(isbn: string): Observable<Product> {
        console.debug('querying beauty database with ', isbn);
        return this.http.get('https://world.openbeautyfacts.org/api/v0/product/' + isbn + '.json')
            .map((res: Response) => this.buildProduct(res.json()));
    }


    private buildProduct(payload: any[]) {
        let p = new Product()

        if (payload == undefined || payload['status'] === 0 || payload['product'] == undefined || payload['product']['product_name'] == undefined || payload['product']['product_name'].length === 0) {
            console.log("Product doesn't exist in database or malformed")
            p.exist = false;
            p.name = "Inconnu";
            return p;
        }
        let forbiddenIngredients = this.bannedIngredients
            .filter(function(ingredient) {
                return payload['product']['ingredients_tags'].indexOf(ingredient) > -1;
            });


        p.name = payload['product']['product_name'];
        p.isOk = forbiddenIngredients.length === 0;
        p.exist = true;
        p.listOfViolations = forbiddenIngredients;

        p.imageUrl = payload['product']['image_url'];
        p.additives = payload['product']['additives_tags'];
        p.allergens = payload['product']['allergens_tags'];
        p.traces = [];
        if (payload['product']['traces'] != null) {
            p.traces = payload['product']['traces'].split(',');
        }
        p.certifications = [];
        if (payload['product']['labels'] != null) {
            p.certifications = payload['product']['labels'].split(',');
        }
        p.description = payload['product']['generic_name'];
        p.quantity = payload['product']['quantity'];
        p.nutritionGrade = payload['product']['nutrition_grades'];
    
        return p;
    }
}
