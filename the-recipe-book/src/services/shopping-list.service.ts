import {Ingredient} from "../models/ingredient.model";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx'

import {AuthService} from "./auth-service";

@Injectable()
export class ShoppingListService {
  private url = 'https://ionic-ebb64.firebaseio.com/';
  private ingredientList: Ingredient[] = [];

  constructor(private http: Http,
              private authService: AuthService) {
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredientList.push(new Ingredient(ingredient.name, ingredient.amount));
  }

  addIngredients(items: Ingredient[]) {
    return this.ingredientList.push(...items);
  }

  getIngredients() {
    return this.ingredientList.slice();
  }

  removeIngredients(index: number) {
    this.ingredientList.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getUserInfo().uid;
    return this.http
      .put(this.url + userId + '/shop-list.json?auth=' + token, this.ingredientList)
      .map((response: Response) => {
        return response.json();
      });
  }

  fetchList(token: string) {
    const userId = this.authService.getUserInfo().uid;
    return this.http.get(this.url + userId + '/shop-list.json?auth=' + token)
      .map((response: Response) => {
        return response.json();
      })
      .do((data) => {
        this.ingredientList = data;
      });
  }

}
