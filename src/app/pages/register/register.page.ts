import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {LoadingService} from '../../services/loading.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    private email: string;
    private password: string;

    constructor(
        private authenticationService: AuthenticationService,
        private loading: LoadingService,
        private router: Router) {
    }

    ngOnInit() {
    }

    tryRegister() {
        this.loading.presentLoader('Creating account...').then(() => {
            this.authenticationService.doBasicUserCreate(this.email, this.password)
                .then(() => {
                    this.loading.dismissLoader().then(() => {
                        this.router.navigate(['/login']).then(() => {
                            console.log('success');
                        });
                    });
                })
                .catch((error) => {
                    this.loading.dismissLoader().then(() => {
                        console.log('error');
                    });
                });
        });
    }

}
