import { Component } from '@angular/core';
import {Ingredient} from "../../models/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  ingredient: Ingredient = { name: null, amount: null };
  ingredientList: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  onAddItem() {
    this.shoppingListService.addIngredient(this.ingredient);
    this.loadItems();
  }

  onRemoveItem(index: number) {
    this.shoppingListService.removeIngredients(index);
    this.loadItems();
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  private loadItems() {
    this.ingredientList = this.shoppingListService.getIngredients();
  }
}
