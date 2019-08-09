import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIePipe } from './orden-ie.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { ieReducer } from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,    
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIePipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    StoreModule.forFeature('ie', ieReducer)
  ]
})
export class IngresoEgresoModule { }
