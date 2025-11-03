import type Remedio from "./Remedio";

export default interface Periodo {
  id: number;
  nome: string;
  horario: string;
  remedio: Remedio[] | null;
}
