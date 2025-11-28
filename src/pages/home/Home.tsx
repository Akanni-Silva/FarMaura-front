/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import CardDestaque from "../../components/remedio/cardDestaque/CardDestaque";
import { useContext, useEffect, useState } from "react";
import type Remedio from "../../models/Remedio";
import { AuthContex } from "../../contexts/AuthContext";
import { buscar } from "../../services/Service";
import Historico from "../historico/Historico";

function Home() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [remedios, setRemedios] = useState<Remedio[]>([]);

  const { usuario, handleLogout } = useContext(AuthContex);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarRemedios();
  }, []);

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

  /** 🟢 MARCAR COMO TOMADO (somente no front-end) */
  function tomei(remedio: Remedio) {
    setRemedios((prev) =>
      prev.map((r) => (r.id === remedio.id ? { ...r, foiTomadoHoje: true } : r))
    );
  }

  /** 🟢 Pegar próximo remédio */
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

      let diff = minutosRemedio - minutosAgora;

      // já passou → considera como amanhã
      if (diff < 0) diff += 1440;

      if (diff < menorDiferenca) {
        menorDiferenca = diff;
        maisProximo = r;
      }
    });

    return maisProximo;
  }

  const remedioDestaque = getRemedioMaisProximo(remedios);

  return (
    <>
      <div className="bg-gray-50 flex justify-center min-h-screen relative">
        <div className="p-4 flex flex-col gap-6">
          {!isLoading && !remedioDestaque && (
            <span className="text-3xl text-center my-8">
              Nenhum Remédio foi encontrado!
            </span>
          )}

          {!isLoading && remedioDestaque && (
            <CardDestaque remedio={remedioDestaque} tomei={tomei} />
          )}

          <h3 className="text-2xl font-bold text-gray-700 -mb-6">Seu Dia</h3>

          <Historico />
        </div>
      </div>
    </>
  );
}

export default Home;
