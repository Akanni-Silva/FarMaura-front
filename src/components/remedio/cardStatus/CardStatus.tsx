import type Remedio from "../../../models/Remedio";

import { Link } from "react-router-dom";
import {
  CheckIcon,
  ClockIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useContext, type ReactNode } from "react";
import { AuthContex } from "../../../contexts/AuthContext";

interface CardStatusProps {
  remedio: Remedio;
  status: string["Tomado" | "Esquecido" | "Pendente"];
}

function CardStatus({ remedio, status }: CardStatusProps) {
  // CONFIGURAÇÃO DOS STATUS (cores e ícones)
  const statusConfig = {
    Tomado: {
      bg: "bg-green-500",
      text: "text-green-700",
      icon: CheckIcon,
    },
    Pendente: {
      bg: "bg-yellow-500",
      text: "text-yellow-700",
      icon: ClockIcon,
    },
    Esquecido: {
      bg: "bg-red-500",
      text: "text-red-700",
      icon: XIcon,
    },
  };

  const { bg, text, icon: StatusIcon } = statusConfig[status];

  const { usuario } = useContext(AuthContex);

  
    let component: ReactNode;
  
    if(usuario.id === remedio.usuario?.id){
      component=(<div className="flex flex-col overflow-hidden justify-between lg:items-center transition-transform duration-300 hover:scale-105 shadow-2xl rounded-3xl bg-white px-6">
      <Link to={`/editarremedio/${remedio.id}`}>
        <div className="flex h-full py-3 items-center gap-4">
          {/* ÍCONE DO STATUS */}
          <StatusIcon
            size={50}
            weight="bold"
            color="white"
            className={`${bg} rounded-full p-2 w-16`}
          />

          <div className="container flex justify-between items-center">
            <h4 className="text-lg font-semibold capitalize">
              {remedio.periodo?.horario} - {remedio.nome}
              <p className={`text-sm font-normal ${text}`}>{status}</p>
            </h4>
          </div>
        </div>
      </Link>
    </div>)
    }
  

  return (
    <>{component}</>
  );
}

export default CardStatus;
