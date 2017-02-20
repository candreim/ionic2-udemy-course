import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import Promise = firebase.Promise;


@Injectable()
export class AuthService {

  public login(credentials) : Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  public register(credentials): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  public getUserInfo() {
    return firebase.auth().currentUser;
  }

  public logout() : Promise<any> {
    return firebase.auth().signOut();
  }
}
