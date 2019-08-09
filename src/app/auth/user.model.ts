export interface IUser
{
    nombre: string;
    email: string;
    uid: string;
}

export class User 
{
    public nombre: string;
    public email: string;
    public uid: string;

    public constructor(user: IUser)
    {
        this.nombre = user && user.nombre || null;
        this.email = user && user.email || null;
        this.uid = user && user.uid || null;
    }
}