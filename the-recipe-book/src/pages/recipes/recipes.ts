import {Component} from '@angular/core';
import {NavController, LoadingController, PopoverController, AlertController} from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe.model";
import {RecipePage} from "../recipe/recipe";
import {AuthService} from "../../services/auth-service";
import {DatabaseOptionsPage} from "../database-options/database-options";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {
  private recipes: Recipe[] = [];

  constructor(private alertCtrl: AlertController,
              private popOverCtrl: PopoverController,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
              private navCtrl: NavController,
              private recipesService: RecipesService) {
  }

  protected onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  protected onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }

  ionViewWillEnter() {
    this.loadRecipes();
  }

  protected loadRecipes() {
    this.recipes = this.recipesService.getRecipes();
  }

  protected onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({content: 'Please wait...'});
    const pop = this.popOverCtrl.create(DatabaseOptionsPage);
    pop.present({ev: event});

    pop.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
        loading.present();
        if (data.action == 'load') {
          this.authService.getUserInfo().getToken()
            .then((token: string) => {
              this.recipesService.fetchList(token)
                .subscribe(
                  (list: Recipe[]) => {
                    if (list) {
                      this.recipes = list;
                    } else {
                      this.recipes = [];
                    }
                  },
                  error => {
                    this.handleError(error.json().error);
                  });
            });
        }
        else if (data.action == 'store') {
          this.authService.getUserInfo().getToken()
            .then((token: string) => {
              this.recipesService.storeList(token)
                .subscribe(
                  () => 'Success',
                  error => {
                    this.handleError(error.json().error);
                  });
            });
        }
        loading.dismiss();
      }
    );
  }

  private handleError(error: string) {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      message: error,
      buttons: ['Ok']
    });
    alert.present();
  }
}
