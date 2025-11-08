import { Link } from "react-router-dom"
import type Periodo from "../../../models/Periodo"

interface CardPeriodoProps{
    periodo: Periodo
}

function CardPeriodo({periodo}:CardPeriodoProps) {
  return (
    <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
      <header className="py-2 px-6 bg-indigo-800 text-white font-bold text-2xl">
        Periodo
      </header>
      <p className="p-8 text-3xl bg-slate-200 h-full">{periodo.nome}</p>

      <div className="flex">
        <Link
          to={`/editarperiodo/${periodo.id}`}
          className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2"
        >
          Editar
        </Link>
        <Link
          to={`/deletarperiodo/${periodo.id}`}
          className="w-full text-slate-100 bg-red-400 hover:bg-red-800 flex items-center justify-center py-2"
        >
          Deletar
        </Link>
      </div>
    </div>
  )
}

export default CardPeriodo