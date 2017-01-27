import { Component } from '@angular/core';
import {Ingredient} from "../../models/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  ingredient: Ingredient = { name: null, amount: null };

  constructor(private shoppingListService: ShoppingListService) { }

  onAddItem() {
    this.shoppingListService.addIngredient(this.ingredient);

    console.log(this.shoppingListService.getIngredients().length);
  }
}
