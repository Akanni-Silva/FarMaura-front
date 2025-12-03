import { Link } from "react-router-dom";
import type Periodo from "../../../models/Periodo";
import { CheckIcon, PencilSimpleIcon } from "@phosphor-icons/react";

interface CardPeriodoProps {
  periodo: Periodo;
}

function CardPeriodo({ periodo }: CardPeriodoProps) {

  
  return (
    <div className="flex flex-col overflow-hidden justify-between  space-x-2 transition-transform duration-300 hover:scale-105 hover:translate-x hover:duration-500 shadow-2xl rounded-3xl  bg-white px-6">
      <Link to={`/editarperiodo/${periodo.id}`}>
        <div className="flex h-full  py-3  items-center gap-4  ">
          <CheckIcon
            size={50}
            weight="bold"
            color="white"
            className="bg-linear-to-r from-green-400 via-green-500 to-sky-500 rounded-full p-2 w-16"
          />
          <div className="text-lg font-semibold capitalize container flex justify-between">
            <div className="flex flex-col">
              <h4>{periodo.nome}</h4>
            </div>

            <PencilSimpleIcon size={20} weight="thin" className="mx-6" />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardPeriodo;
