import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{
    
    constructor(private authService: AuthService, private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated()
        .then(
            (auth: boolean) =>{
                if(auth){
                    return true;
                }else{
                    this.router.navigate(['/']);
                    return false;
                }
            }
        )
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.canActivate(route, state);
    }
}