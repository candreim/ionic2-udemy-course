import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController} from "ionic-angular";
import {AuthService} from "../../services/auth-service";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  credentials = {email: '', password: ''};

  constructor(private navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private auth: AuthService) {
  }

  protected onSignup() {
    const loading = this.loadingCtrl.create({
      content: 'Signing in...'
    });
    loading.present();

    this.auth.register(this.credentials)
      .then(data => {
        loading.dismiss();
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
