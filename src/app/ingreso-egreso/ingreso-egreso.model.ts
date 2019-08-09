export interface IIngresoEgreso
{
    uid?: string;
    monto:  number;
    tipo: string;
    descripcion: string;
}

export class IngresoEgreso
{
    public uid?: string;
    public monto:  number;
    public tipo: string;
    public descripcion: string;

    public constructor(ie: IIngresoEgreso)
    {
        // this.uid = ie && ie.uid || null;
        this.monto = ie && ie.monto || null;
        this.tipo = ie && ie.tipo || null;
        this.descripcion = ie && ie.descripcion || null;
    }
}