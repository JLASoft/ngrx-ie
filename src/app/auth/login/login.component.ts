import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy
{
  
    public loading: boolean;
    public subscribe: Subscription = new Subscription();

    public constructor(private auth: AuthService, private store: Store<AppState>)
    {

    }

    ngOnInit()
    {
        this.subscribe = this.store.select('ui').subscribe
        (
            ui => this.loading = ui.isLoading
        );
    }

    ngOnDestroy()
    {
        this.subscribe.unsubscribe();
    }

    public OnSubmit(data: any)
    {
        this.auth.Login(data.email, data.password);
    }
}
