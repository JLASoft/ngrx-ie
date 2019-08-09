import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { OnLoadingAction, OffLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy
{
    private userSuscription: Subscription = new Subscription();
    private usuario: User;

    public constructor
    (
        private afa: AngularFireAuth, 
        private router: Router, 
        private dbFire: AngularFirestore,
        private store: Store<AppState>
    )
    {
      
    }

    ngOnDestroy()
    {
        this.userSuscription.unsubscribe();
    }

    public InitAuthListener()
    {
        this.afa.authState.subscribe
        (
            user =>
            {
                if (user)
                {
                    this.userSuscription = this.dbFire.doc(`${user.uid}/usuario`).valueChanges().subscribe
                    (
                        (user_db: any) => 
                        {
                            this.store.dispatch(new SetUserAction(user_db));
                            this.usuario = user_db;
                        }
                    );
                }
                else
                {
                    this.usuario = null;
                    this.userSuscription.unsubscribe();
                }
            }
        );
    }

    public CrearUsuario(nombre: string, email: string, password: string) : void
    {
        this.store.dispatch(new OnLoadingAction());
        this.afa.auth
            .createUserWithEmailAndPassword(email, password)
            .then
            (
                res =>
                {
                    const user: User =
                    {
                        uid: res.user.uid,
                        nombre: nombre,
                        email: res.user.email
                    };

                    this.dbFire
                        .doc(`${user.uid}/usuario`)
                        .set(user)
                        .then
                        (
                            res =>
                            {
                                this.router.navigate(['/login']);
                                this.store.dispatch(new OffLoadingAction());
                            }
                        )
                        .catch
                        (
                            error =>
                            {
                                Swal.fire('Error al crear el Usuario', error.message, 'error');
                                this.store.dispatch(new OffLoadingAction());
                            }
                        );
                }
            )
            .catch
            (
                error =>
                {
                    Swal.fire('Error al crear el Usuario', error.message, 'error');
                    this.store.dispatch(new OffLoadingAction());
                }
            );
        
    }

    public Login(email: string, password: string) : void
    {
        this.store.dispatch(new OnLoadingAction());
        this.afa.auth
            .signInWithEmailAndPassword(email, password)
            .then
            (
                res => 
                {
                    this.router.navigate(['/'])
                    this.store.dispatch(new OffLoadingAction());
                }
            )
            .catch
            (
                error => 
                {
                    Swal.fire('Error en el Login', error.message, 'error');
                    this.store.dispatch(new OffLoadingAction());
                }
            );
    }

    public Logout() : void
    {
        this.router.navigate(['/login']);
        this.afa.auth.signOut();
        this.store.dispatch(new UnsetUserAction());
    }

    public IsAuth()
    {
        return this.afa.authState.pipe
        (
            map
            (
                user => 
                {
                    if (user ===null)
                        this.router.navigate(['/login']);

                    return user != null;
                }
            )
        );
    }

    public GetUsuario()
    {
        return { ...this.usuario };
    }
}
