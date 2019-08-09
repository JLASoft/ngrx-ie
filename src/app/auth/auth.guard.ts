import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad
{
    constructor(private auth: AuthService)
    {

    }

    canActivate()
    {
        return this.auth.IsAuth();
    }

    canLoad()
    {
        return this.auth.IsAuth().pipe(take(1));
    }
}
