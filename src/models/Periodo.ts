import type Remedio from "./Remedio";
import type Usuario from "./Usuario";

export default interface Periodo {
  id: number;
  nome: string;
  horario: string;
  remedio: Remedio[] | null;
  usuario?: Usuario | null;
}
