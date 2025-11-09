import { useContext, type ReactNode } from "react";
import type Remedio from "../../../models/Remedio";
import { AuthContex } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";

interface CardRemedioProps {
  remedio: Remedio;
}

function CardRemedio({ remedio }: CardRemedioProps) {
  const { usuario } = useContext(AuthContex);

  let component: ReactNode;

  if (usuario.id === remedio.usuario?.id) {
    component = (
      <div className="flex flex-col rounded my-3 justify-between">
        {" "}
        <div className="flex gap- items-center justify-center">
          <img
            src="https://i.postimg.cc/hP3mFkDb/Motocross-amico-1.png"
            alt=""
            className="aspect-auto size-12"
          />
          <div className="mx-9">
            {" "}
            <p>{remedio.nome}</p>
            <p>{remedio.doseMg} Km</p>
            <p>{remedio.periodo?.nome}</p>
            <hr className="border-white w-full" />
          </div>
          <div className="flex flex-col">
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
        </div>
      </div>
    );
  }
  return <>{component}</>;
}

export default CardRemedio;
