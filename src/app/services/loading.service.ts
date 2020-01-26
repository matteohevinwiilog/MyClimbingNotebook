import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    constructor(private loader: LoadingController) {
    }

    public presentLoader(text: string) {
        return new Promise<any>((resolve, reject) => {
            this.loader.create({
                message: text
            }).then((loading) => {
                loading.present().then(() => {
                    resolve();
                });
            });
        });
    }

    public dismissLoader() {
        return new Promise<any>(((resolve, reject) => {
            this.loader.dismiss().then(() => {
                resolve();
            });
        }));
    }
}
