import type Remedio from "./Remedio";

export default interface Usuario{
    id:number;
    nome:string;
    usuario:string;
    foto:string;
    senha:string;
    remedios?:Remedio[] | null;
    
}