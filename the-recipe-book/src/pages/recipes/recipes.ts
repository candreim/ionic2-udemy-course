import {Component, OnInit} from '@angular/core';
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

  private onNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'New' });
  }

  private onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, { recipe: recipe, index: index });
  }

  ionViewWillEnter() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipes = this.recipesService.getRecipes();
  }
}
