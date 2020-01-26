import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    private connectedUserId: string;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private routerActiv: ActivatedRoute
    ) {
        routerActiv.params.subscribe(val => {
            this.connectedUserId = val.userId;
        });
    }

    ngOnInit() {
    }

    logout() {
        this.authenticationService.logout().then(() => {
            this.router.navigate(['/login']);
        });
    }
}
