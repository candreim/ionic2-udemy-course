import {Ingredient} from "../models/ingredient.model";

export class ShoppingListService {
  private ingredientList: Ingredient[] = [];

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
}
