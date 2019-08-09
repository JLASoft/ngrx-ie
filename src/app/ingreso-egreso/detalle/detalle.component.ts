import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../ingreso-egreso.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy
{
    public items: Array<IngresoEgreso> = new Array<IngresoEgreso>();
    public subscription: Subscription = new Subscription();

    public constructor(private store: Store<AppState>, private ie: IngresoEgresoService)
    {

    }

    ngOnInit()
    {
        this.subscription = this.store.select('ie').subscribe
        (
            ie =>
            {
                console.log(ie.items);
                this.items = ie.items;
            }
        );
    }

    ngOnDestroy()
    {
        this.subscription.unsubscribe();
    }

    public BorrarItem(uid: string)
    {
        this.ie.BorrarItem(uid)
            .then
            (
                success=>
                {
                    Swal.fire('Borrado', 'Se elimino el registro correctamente', 'success');
                }
            )
            .catch
            (
                error =>
                {
                    Swal.fire('Fallo', 'No fue posible eliminar el registro', 'error');
                }
            );
    }
}
