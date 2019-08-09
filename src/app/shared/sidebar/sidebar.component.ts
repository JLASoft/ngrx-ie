import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy
{
    public usuario: User;
    public suscripcion: Subscription = new Subscription();

    public constructor(private auth: AuthService, private store: Store<AppState>, private ie: IngresoEgresoService)
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

    public Logout()
    {
        this.auth.Logout();
        this.ie.CancelarSubscription();
    }
}
