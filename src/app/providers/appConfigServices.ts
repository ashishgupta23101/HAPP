import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppConfigService {
    private appConfig;

    constructor () { }

    loadAppConfig() {
        // let http = this.injector.get(HttpClient);
        // return http.get('../appsettings.json')
        // .toPromise()
        // .then(data => {
        //     this.appConfig = data;
        // });
    }

    get config() {
        return this.appConfig;
    }
}