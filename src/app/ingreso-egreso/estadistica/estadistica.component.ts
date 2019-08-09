import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../ingreso-egreso.reducer'
import { IngresoEgreso } from '../ingreso-egreso.model';

import { MultiDataSet, Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit
{
    public ingreso: number;
    public egreso: number;
    public cuantosIngresos: number;
    public cuantosEgresos: number;

    public labels: Label[] = ['Ingresos', 'Egresos'];
    public data: SingleDataSet = [];

    public constructor(private store: Store<AppState>)
    {
      
    }

    ngOnInit()
    {
        this.store.select('ie').subscribe
        (
            data => this.ProcesarIE(data.items)
        );
    }

    public ProcesarIE(items: Array<IngresoEgreso>)
    {
        // console.table(items);
        this.ingreso = 0;
        this.egreso = 0;
        this.cuantosIngresos = 0;
        this.cuantosEgresos = 0;

        items.forEach
        (
            item =>
            {
                if (item.tipo === 'ingreso')
                {
                    this.cuantosIngresos++;
                    this.ingreso += item.monto;
                }
                else
                {
                    this.cuantosEgresos++;
                    this.egreso += item.monto;
                }
            }
        );

        this.data = [this.ingreso, this.egreso];
    }
}
