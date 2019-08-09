import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit
{
    public loading: boolean;
    public subscribe: Subscription = new Subscription();

    public constructor(private auth: AuthService, private store: Store<AppState>)
    {

    }

    ngOnInit()
    {
        this.store.select('ui').subscribe
        (
            ui => this.loading = ui.isLoading
        );
    }

    ngOnDestroy(): void
    {
        this.subscribe.unsubscribe();
    }

    public OnSubmit(data: any)
    {
        this.auth.CrearUsuario(data.nombre, data.email, data.password);
    }

}
