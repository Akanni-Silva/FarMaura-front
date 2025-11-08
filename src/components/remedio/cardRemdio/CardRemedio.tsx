import { useContext } from "react";
import type Remedio from "../../../models/Remedio"
import { AuthContex } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";

interface CardRemedioProps{
    remedio:Remedio
}

function CardRemedio({remedio}: CardRemedioProps) {
    const { usuario } = useContext(AuthContex);
  return (
     <div className="border-slate-900 border flex flex-col rounded overflow-hidden justify-between">
      <div>
        <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
          <img
            src={remedio.usuario?.foto || "https://i.imgur.com/pK6vSCy.png"}
            className="h-12 rounded-full"
            alt={remedio.usuario?.nome}
          />
          <h3 className="text-lg font-bold text-center uppercase">
            {remedio.usuario?.nome}
          </h3>
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold uppercase">{remedio.nome}</h4>
          <p>{remedio.doseMg}</p>
          <p>{remedio.periodo?.nome}</p>
        </div>
      </div>
      {usuario.id === remedio.usuario?.id && (
        <div className="flex">
          <Link
            to={`/editarremedio/${remedio.id}`}
            className="w-full text-white bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2"
          >
            <button>Editar</button>
          </Link>
          <Link
            to={`/deletarremedio/${remedio.id}`}
            className="text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center"
          >
            <button>Deletar</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default CardRemedio