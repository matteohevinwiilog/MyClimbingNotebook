import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingService} from '../../services/loading.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    private connectedUserId: string;
    private userIsVerified: boolean;
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private loadingService: LoadingService,
        private routerActiv: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.loadingService.presentLoader('Retrieving account...').then(() => {
            this.routerActiv.params.subscribe(val => {
                this.connectedUserId = val.userId;
                this.authenticationService.watchUser().then((user) => {
                    this.userIsVerified = user.emailVerified;
                    this.loadingService.dismissLoader();
                });
            });
        });
    }

    logout() {
        this.authenticationService.logout().then(() => {
            this.router.navigate(['/login']);
        });
    }
}
