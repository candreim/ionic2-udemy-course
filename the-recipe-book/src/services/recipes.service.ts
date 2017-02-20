import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx'

import {Recipe} from "../models/recipe.model";
import {Ingredient} from "../models/ingredient.model";
import {AuthService} from "./auth-service";

@Injectable()
export class RecipesService {
  private url = 'https://ionic-ebb64.firebaseio.com/';
  private recipes: Recipe[] = [];

  constructor(private http: Http,
              private authService: AuthService) {
  }

  addRecipe(title: string,
            description: string,
            difficulty: string,
            ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    console.log(this.recipes);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  updateRecipe(index: number,
               title: string,
               description: string,
               difficulty: string,
               ingredients: Ingredient[]) {

    this.recipes[index].title = title;
    this.recipes[index].description = description;
    this.recipes[index].difficulty = difficulty;
    this.recipes[index].ingredients = ingredients;
  }

  removeRecipes(index: number) {
    this.recipes.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getUserInfo().uid;
    return this.http
      .put(this.url + userId + '/recipe-list.json?auth=' + token, this.recipes)
      .map((response: Response) => {
        return response.json();
      });
  }

  fetchList(token: string) {
    const userId = this.authService.getUserInfo().uid;
    return this.http.get(this.url + userId + '/recipe-list.json?auth=' + token)
      .map((response: Response) => {
      const recipes: Recipe[] = response.json() ? response.json() : []
      for(let rcp of recipes) {
        if(!rcp.hasOwnProperty('ingredients')) {
          rcp.ingredients = [];
        }
      }
        return response.json();

      })
      .do((data) => {
        this.recipes = data;
      });
  }

}
