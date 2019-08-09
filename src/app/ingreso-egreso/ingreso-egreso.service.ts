import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso-actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService
{
    private listener: Subscription = new Subscription();
    private items: Subscription = new Subscription();

    public constructor(private dbFire: AngularFirestore, private auth: AuthService, private store: Store<AppState>)
    {
        
    }

    public InitListenerIE()
    {
        this.listener = this.store.select('auth')
            .pipe(filter(auth => auth.user != null))
            .subscribe
            (
                auth => this.ItemsIE(auth.user.uid)
            );
    }

    public CrearIE(ie: IngresoEgreso)
    {
        return this.dbFire
            .doc(`${this.auth.GetUsuario().uid}/ingreso-egreso`)
            .collection('items')
            .add({ ...ie });
    }

    public ItemsIE(uid: string)
    {
        this.items = this.dbFire
            .collection(`${uid}/ingreso-egreso/items/`)
            .snapshotChanges()
            .pipe
            (
                map
                (
                    items =>
                    {
                        return items.map
                        (
                            doc => { return { uid: doc.payload.doc.id, ...doc.payload.doc.data() }; }
                        )
                    }
                )
            )
            .subscribe
            (
                (items: any) => this.store.dispatch(new SetItemsAction(items))
            );
    }

    public CancelarSubscription()
    {
        this.listener.unsubscribe();
        this.items.unsubscribe();
        this.store.dispatch(new UnsetItemsAction());
    }

    public BorrarItem(uid: string)
    {
        return this.dbFire
            .doc(`${this.auth.GetUsuario().uid}/ingreso-egreso/items/${uid}`)
            .delete();
    }
}
