import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe.model";
import {RecipePage} from "../recipe/recipe";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {
  private recipes: Recipe[] = [];

  constructor(private navCtrl: NavController,
              private recipesService: RecipesService) {}

  protected onNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'New' });
  }

  protected onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, { recipe: recipe, index: index });
  }

  ionViewWillEnter() {
    this.loadRecipes();
  }

  protected loadRecipes() {
    this.recipes = this.recipesService.getRecipes();
  }
}
