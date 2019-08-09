import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy
{
    public usuario: User;
    public suscripcion: Subscription = new Subscription();

    public constructor(private store: Store<AppState>)
    {
      
    }

    ngOnInit()
    {
        this.suscripcion = this.store.select('auth')
            .pipe(filter(auth => auth.user != null))
            .subscribe
            (
                data => this.usuario = data.user
            );
    }

    ngOnDestroy()
    {
        this.suscripcion.unsubscribe();
    }
}
