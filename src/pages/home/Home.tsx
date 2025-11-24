/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import CardDestaque from "../../components/remedio/cardDestaque/CardDestaque";
import ListarRemedios from "../../components/remedio/listarRemedios/ListarRemedios";
import { useContext, useEffect, useState } from "react";
import type Remedio from "../../models/Remedio";
import { AuthContex } from "../../contexts/AuthContext";
import { buscar } from "../../services/Service";

function Home() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [remedios, setRemedios] = useState<Remedio[]>([]);

  const { usuario, handleLogout } = useContext(AuthContex);
  const token = usuario.token;

  const remedioDestaque = getRemedioMaisProximo(remedios);

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

  function getRemedioMaisProximo(lista: Remedio[]): Remedio | null {
    if (!lista || lista.length === 0) return null;

    const agora = new Date();
    const minutosAgora = agora.getHours() * 60 + agora.getMinutes();

    let maisProximo: Remedio | null = null;
    let menorDiferenca = Infinity;

    lista.forEach((r) => {
      if (!r.periodo?.horario) return;

      const [h, m] = r.periodo.horario.split(":").map(Number);
      const minutosRemedio = h * 60 + m;

      // diferença considerando o próximo horário possível
      let diff = minutosRemedio - minutosAgora;

      // se já passou, considera amanhã
      if (diff < 0) diff += 1440; // 24h

      if (diff < menorDiferenca) {
        menorDiferenca = diff;
        maisProximo = r;
      }
    });

    return maisProximo;
  }

  return (
    <>
      <div className="bg-gray-50 flex justify-center min-h-screen relative">
        <div className=" p-4 flex flex-col gap-6">
          {/* Card Destaque */}
          {!isLoading && !remedioDestaque && (
            <span className="text-3xl text-center my-8">
              Nenhum Remedio foi encontrado!
            </span>
          )}

          {!isLoading && remedioDestaque && (
            <CardDestaque remedio={remedioDestaque} />
          )}
          {/* SEU DIA */}
          <h3 className="text-2xl font-bold text-gray-700 -mb-9">Seu Dia</h3>
          <ListarRemedios />
        </div>
      </div>
    </>
  );
}

export default Home;
