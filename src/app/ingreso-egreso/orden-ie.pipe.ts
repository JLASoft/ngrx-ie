import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from './ingreso-egreso.model';

@Pipe({
  name: 'ordenIe'
})
export class OrdenIePipe implements PipeTransform
{

    transform(items: Array<IngresoEgreso>): Array<IngresoEgreso> 
    {
        return items.sort
        (
            (a, b) =>
            {
                if (a.tipo === 'ingreso')
                    return -1;
                else
                    return 1;
            }
        );
    }
}
