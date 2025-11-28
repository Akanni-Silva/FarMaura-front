import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContex } from "../../contexts/AuthContext";
import type Remedio from "../../models/Remedio";
import CardStatus from "../../components/remedio/cardStatus/CardStatus";
import { buscar } from "../../services/Service";
import { SyncLoader } from "react-spinners";

function Historico() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [remedios, setRemedios] = useState<Remedio[]>([]);

  const { usuario, handleLogout } = useContext(AuthContex);
  const token = usuario.token;

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
    }
  }, [token]);

  useEffect(() => {
    buscarRemedios();
  }, [remedios.length]);

  async function buscarRemedios() {
    try {
      setIsLoading(true);

      await buscar("/remedios", setRemedios, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

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
        <div
          className="
                  container mx-auto mb-4 mt-2
                  grid grid-cols-1  
                  lg:grid-cols-3 gap-4
                "
        >
          {remedios.map((remedio) => {
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

export default Historico;
