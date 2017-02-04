import {Component, OnInit} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Recipe} from "../../models/recipe.model";

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html'
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(private navParams: NavParams) {
  }

  ngOnInit () {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  private onAddIngredient() {
    console.log('onAddIngredient');
  }

  private onEditRecipe() {
    console.log('onEditRecipe');
  }

  private onDeleteRecipe() {
    console.log('onDeleteRecipe');
  }
}
