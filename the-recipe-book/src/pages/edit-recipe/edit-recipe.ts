import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {NavController, NavParams, ActionSheetController, AlertController} from 'ionic-angular';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit {
  mode: string;
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(private navParams: NavParams,
              private alertCtrl: AlertController,
              private actSheetCtrl: ActionSheetController) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      difficulty: new FormControl('Easy', Validators.required),
    });
  }

  onSubmitRecipe() {
    console.log(this.recipeForm);
  }

  onManageIngredients() {
    const actionSheet = this.actSheetCtrl.create({
      title: 'What you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {

          }
        },
        {
          text: 'Remove All Ingredient',
          role: 'destructive',
          handler: () => {

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

  private createNewIngredient () {
    const newIngredientAlert = this.alertCtrl.create({
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
             if(data.name == null || data.name.trim() == '') {

             }

           }
         }]
    });

  }
}
