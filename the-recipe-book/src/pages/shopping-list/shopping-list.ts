import {Component} from '@angular/core';
import {Ingredient} from "../../models/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";
import {PopoverController, LoadingController, AlertController} from "ionic-angular";
import {DatabaseOptionsPage} from "../database-options/database-options";
import {AuthService} from "../../services/auth-service";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  ingredient: Ingredient = {name: null, amount: null};
  ingredientList: Ingredient[] = [];

  constructor(private alertCtrl: AlertController,
              private popOverCtrl: PopoverController,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
              private shoppingListService: ShoppingListService) {
  }

  protected onAddItem() {
    this.shoppingListService.addIngredient(this.ingredient);
    this.loadItems();
  }

  protected onRemoveItem(index: number) {
    this.shoppingListService.removeIngredients(index);
    this.loadItems();
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  protected onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({content: 'Please wait...'});
    const pop = this.popOverCtrl.create(DatabaseOptionsPage);
    pop.present({ev: event});

    pop.onDidDismiss(
      data => {
        if(!data)
        {
          return;
        }
        loading.present();
        if (data.action == 'load') {
          this.authService.getUserInfo().getToken()
            .then((token: string) => {
              this.shoppingListService.fetchList(token)
                .subscribe(
                  (list: Ingredient[]) => {
                    if (list) {
                      this.ingredientList = list;
                    } else {
                      this.ingredientList = [];
                    }
                  },
                  error => {
                    this.handleError(error.json().error);
                  });
            });
        }
        else if(data.action == 'store') {
          this.authService.getUserInfo().getToken()
            .then((token: string) => {
              this.shoppingListService.storeList(token)
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

  private loadItems() {
    this.ingredientList = this.shoppingListService.getIngredients();
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
