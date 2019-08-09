import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { AppState } from './ingreso-egreso.reducer';
import { OnLoadingAction, OffLoadingAction } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy
{
    public form: FormGroup;
    public tipo: string = 'ingreso';
    public cargando: boolean;

    public loading: Subscription = new Subscription();

    public constructor(private ie: IngresoEgresoService, private store: Store<AppState>)
    {

    }

    ngOnInit()
    {
        this.loading = this.store.select('ui').subscribe
        (
            ui => this.cargando = ui.isLoading
        );

        this.form = new FormGroup
        ({
            'descripcion': new FormControl('', Validators.required),
            'monto': new FormControl(0, Validators.min(0))
        });
    }

    ngOnDestroy()
    {
        this.loading.unsubscribe();
    }

    public CrearIE()
    {
        this.store.dispatch(new OnLoadingAction());
        
        this.ie.CrearIE(new IngresoEgreso({ ...this.form.value, tipo: this.tipo }))
            .then
            (
                res => 
                {
                    this.store.dispatch(new OffLoadingAction());
                    this.form.reset({ monto: 0 });
                    Swal.fire('Creacion de Ingreso - Egreso', 'Se creo correctamente el registro', 'success');
                }
            )
            .catch
            (
                error => 
                {
                    this.store.dispatch(new OffLoadingAction());
                    Swal.fire('Error al crear Ingreso - Egreso', error.message, 'error');
                }
            );
    }
}
