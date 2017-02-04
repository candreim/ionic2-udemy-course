import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {NavParams, ActionSheetController, AlertController, ToastController, NavController} from 'ionic-angular';
import {RecipesService} from "../../services/recipes.service";

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit {
  mode: string;
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private actSheetCtrl: ActionSheetController,
              private recipesService: RecipesService) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      difficulty: new FormControl('Easy', Validators.required),
      ingredients: new FormArray([])
    });
  }

  onSubmitRecipe() {
    const value = this.recipeForm.value;
    let ingredients = [];
    if(value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return { name: name, amount: 0 };
      });
    }
    this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actSheetCtrl.create({
      title: 'What you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredient().present();
          }
        },
        {
          text: 'Remove All Ingredient',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if(len > 0) {
              for (let i = len - 1; i >= 0; i++) {
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'All ingredients are deleted!',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredient() {
    return this.alertCtrl.create({
      title: 'Add Ingredients',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name == null || data.name.trim() == '') {
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid value!',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(
              new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'Item added!',
              duration: 1500,
              position: 'bottom'
            });
            toast.present();
          }
        }]
    });
  }
}
