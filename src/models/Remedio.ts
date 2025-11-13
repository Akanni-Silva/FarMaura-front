import type Periodo from "./Periodo";
import type Usuario from "./Usuario";

export default interface Remedio{
    id:number;
    nome:string;
    doseMg?:number;
    periodo?:Periodo | null;
    usuario?:Usuario |null;
}