import {Component} from '@angular/core';
import {AuthService} from "../../services/auth-service";
import {TabsPage} from "../tabs/tabs";
import {NavController, AlertController, LoadingController} from "ionic-angular";
import {SignupPage} from "../signup/signup";


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  credentials = {email: '', password: ''};

  constructor(private navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private auth: AuthService) {
  }

  protected onSignUp() {
    this.navCtrl.push(SignupPage);
  }

  protected onLogin() {
    const loading = this.loadingCtrl.create({
      content: 'Signing in...'
    });
    loading.present();

    this.auth.login(this.credentials)
      .then(data => {
        loading.dismiss();
        this.navCtrl.setRoot(TabsPage)
      })
      .catch(error => {
        loading.dismiss()
          .then(() => {
            const alert = this.alertCtrl.create({
              title: error.name,
              message: error.message,
              buttons: ['OK']
            });
            alert.present();
          });
      });
  }
}
