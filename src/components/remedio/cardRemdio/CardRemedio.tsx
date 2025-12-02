import type Remedio from "../../../models/Remedio";

import { Link } from "react-router-dom";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { PencilSimpleIcon } from "@phosphor-icons/react";
import { AuthContex } from "../../../contexts/AuthContext";
import { useContext, type ReactNode } from "react";

interface CardRemedioProps {
  remedio: Remedio;
}

function CardRemedio({ remedio }: CardRemedioProps) {
  const { usuario } = useContext(AuthContex);

  let component: ReactNode;

  if(usuario.id === remedio.usuario?.id) {
    component =(<div className="flex flex-col overflow-hidden justify-between lg:items-center space-x-2 transition-transform duration-300 hover:scale-105 hover:translate-x hover:duration-500 shadow-2xl rounded-3xl  bg-white px-6">
      <Link to={`/editarremedio/${remedio.id}`}>
        <div className="flex h-full  py-3  items-center gap-4 ">
          <CheckIcon
            size={50}
            weight="bold"
            color="white"
            className="bg-linear-to-r from-green-400 via-green-500 to-sky-500 rounded-full p-2 w-16"
          />
          <div className="container flex justify-between items-center">
            <h4 className="text-lg font-semibold capitalize">
              {remedio.nome} {remedio.doseMg} mg
              <p>{remedio.periodo?.nome}</p>
            </h4>

            <PencilSimpleIcon size={20} weight="thin" className=" right-6" />
          </div>
        </div>
      </Link>
    </div>)
  }

  return (
    <>{component}</>
  );
}

export default CardRemedio;
