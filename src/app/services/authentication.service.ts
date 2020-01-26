import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {BasicUser} from '../entities/BasicUser';
import {User} from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private angularFireAuth: AngularFireAuth) {
    }

    doBasicUserSignIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    doBasicUserCreate(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    this.getCurrentUser().sendEmailVerification().then(() => {
                        resolve(response);
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    isUserConnected(): boolean {
        return firebase.auth().currentUser !== null;
    }

    getCurrentUser(): User | null {
        return (this.isUserConnected() ? firebase.auth().currentUser : null);
    }

    getCurrentUserId(): string {
        return (this.isUserConnected() ? firebase.auth().currentUser.uid : '');
    }

    logout(): Promise<void> {
        return new Promise<void>((resolve) => {
            firebase.auth().signOut().then(() => {
                resolve();
            });
        });
    }

    watchUser() {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    }
}
