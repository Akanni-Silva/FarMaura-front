import { useContext, useEffect, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContex } from "../../contexts/AuthContext";
import type Remedio from "../../models/Remedio";
import CardStatus from "../../components/remedio/cardStatus/CardStatus";
import { SyncLoader } from "react-spinners";

function ListarStatus({ clicou }: any) {
  const navigate = useNavigate();

  const [isLoading] = useState<boolean>(false);

  // const [remedios, setRemedios] = useState<Remedio[]>([]);

  const { usuario, remedios, getRemedios } = useContext(AuthContex);
  const token = usuario.token;
  const location = useLocation()

  function calcularStatus(remedio: Remedio, horarioAtual: Date): string {
    if (remedio.foiTomadoHoje) {
      return "Tomado";
    }

    const [horas, minutos] = remedio.periodo!.horario.split(":").map(Number);

    const horarioRemedio = new Date();
    horarioRemedio.setHours(horas);
    horarioRemedio.setMinutes(minutos);
    horarioRemedio.setSeconds(0);
    horarioRemedio.setMilliseconds(0);

    if (horarioAtual < horarioRemedio) {
      return "Pendente"; // antes do horário
    }

    return "Esquecido"; // passou da hora e não tomou
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    } getRemedios()
  }, [token]);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}
      <div className="relative">
        {!isLoading && remedios.length === 0 && (
          <span className="text-3xl text-center my-8">
            Nenhum Remédio foi encontrado!
          </span>
        )}
        {location.pathname === "/historico" &&(<h3 className="text-xl font-bold text-center py-3">Agenda</h3>)}
        <div
          className="
                  container mx-auto mb-4 mt-2 px-8
                  grid grid-cols-1 gap-4
                "
        > 
          {remedios
            .filter(remedio => remedio.periodo && remedio.periodo.horario) // Filtro para evitar erros
            .map((remedio) => {
            const status = calcularStatus(remedio, new Date()); // <-- Agora envia horário atual

            return (
              <CardStatus key={remedio.id} remedio={remedio} status={status} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ListarStatus;
