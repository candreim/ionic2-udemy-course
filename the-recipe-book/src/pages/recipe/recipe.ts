import {Component, OnInit} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {Recipe} from "../../models/recipe.model";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {ShoppingListService} from "../../services/shopping-list.service";
import {RecipesService} from "../../services/recipes.service";

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html'
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private slService: ShoppingListService,
              private recipeService: RecipesService) {
  }

  ngOnInit () {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  protected onAddIngredient() {
    this.slService.addIngredients(this.recipe.ingredients);
  }

  protected  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'Edit', recipe: this.recipe, index: this.index });
  }

  protected  onDeleteRecipe() {
    this.recipeService.removeRecipes(this.index);
    this.navCtrl.popToRoot();
  }
}
