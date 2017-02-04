import {Recipe} from "../models/recipe.model";
import {Ingredient} from "../models/ingredient.model";

export class RecipesService {
  private recipes: Recipe[] = [];

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

}
