import { Inject, Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(@Inject(Router) private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const exptime = new Date(localStorage.getItem('expires'));
        let _token = localStorage.getItem('AuthToken');

        const curtime = new Date();
        if (curtime <= exptime && _token !== null && _token !== 'null' && _token !== undefined && _token !== ''){
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}