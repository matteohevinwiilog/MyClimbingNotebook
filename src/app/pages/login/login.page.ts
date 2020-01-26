import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {LoadingService} from '../../services/loading.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public email: string;
    public password: string;

    constructor(
        private authenticationService: AuthenticationService,
        private loading: LoadingService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.loading.presentLoader('Launching app...').then(() => {
            this.authenticationService.watchUser().then((user) => {
                this.loading.dismissLoader().then(() => {
                    this.router.navigate(['/dashboard', user.uid]);
                });
            }).catch(() => {
                this.loading.dismissLoader();
            });
        });
    }

    tryLogin() {
        this.loading.presentLoader('Logging in...').then(() => {
            this.authenticationService.doBasicUserSignIn(this.email, this.password)
                .then((credentials) => {
                    this.loading.dismissLoader().then(() => {
                        this.router.navigate(['/dashboard', credentials.user.uid]).then(() => {
                            console.log('success');
                        });
                    });
                })
                .catch((error) => {
                    this.loading.dismissLoader().then(() => {
                      this.router.navigate(['/register']).then(() => {
                        console.log('error');
                      });
                    });
                });
        });
    }

}
