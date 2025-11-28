/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import type Remedio from "../../models/Remedio";
import { AuthContex } from "../../contexts/AuthContext";
import { buscar } from "../../services/Service";
import Historico from "../historico/Historico";

function Home() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [remedios, setRemedios] = useState<Remedio[]>([]);

  const { usuario, handleLogout } = useContext(AuthContex);
  const token = usuario.token;

  // ► Bloqueio caso não esteja logado
  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token]);

  // ► Carrega remédios
  useEffect(() => {
    buscarRemedios();
  }, []);

  // ► Zera "tomado" todos os dias às 00:00
  useEffect(() => {
    const verificarReset = setInterval(() => {
      const agora = new Date();
      if (agora.getHours() === 0 && agora.getMinutes() === 0) {
        setRemedios((prev) =>
          prev.map((r) => ({ ...r, foiTomadoHoje: false }))
        );
      }
    }, 60000); // verifica a cada 1 min

    return () => clearInterval(verificarReset);
  }, []);

  async function buscarRemedios() {
    try {
      setIsLoading(true);

      await buscar("/remedios", setRemedios, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
    } finally {
      setIsLoading(false);
    }
  }

  /** 🟢 MARCAR COMO TOMADO */
  function tomei(remedio: Remedio) {
    setRemedios((prev) =>
      prev.map((r) => (r.id === remedio.id ? { ...r, foiTomadoHoje: true } : r))
    );
  }

  /** 🟢 Pegar próximo remédio pendente ou atrasado */
  function getRemedioMaisProximo(lista: Remedio[]): Remedio | null {
    if (!lista || lista.length === 0) return null;

    const agora = new Date();
    const minutosAgora = agora.getHours() * 60 + agora.getMinutes();

    let maisProximo: Remedio | null = null;
    let menorDiferenca = Infinity;

    lista.forEach((r) => {
      if (!r.periodo?.horario) return;

      // ignora os que já foram tomados hoje
      if (r.foiTomadoHoje) return;

      const [h, m] = r.periodo.horario.split(":").map(Number);
      const minutosRemedio = h * 60 + m;

      let diff = minutosRemedio - minutosAgora;

      // Se já passou → conta como atrasado (valor positivo forçado)
      if (diff < 0) diff = 9999;

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
              Nenhum remédio pendente!
            </span>
          )}

          {!isLoading && remedioDestaque && (
            <div
              className="bg-linear-to-r from-green-500 to-sky-500 
              text-white rounded-3xl shadow-xl p-6 -mt-6 container"
            >
              <p className="text-lg font-semibold opacity-90 tracking-wide">
                PRÓXIMA DOSE:
              </p>

              <h2 className="text-4xl font-extrabold capitalize">
                {remedioDestaque.nome} {remedioDestaque.doseMg} Mg
              </h2>

              <p className="text-base mt-2 mb-6 opacity-90">
                Período: {remedioDestaque.periodo?.nome}
              </p>

              <button
                className="w-full bg-linear-to-r from-green-400 to-sky-400
                text-white text-2xl font-extrabold py-4 rounded-full shadow-xl 
                hover:scale-105 transition-all duration-300"
                onClick={() => tomei(remedioDestaque)} // <-- FIX AQUI
              >
                TOMEI!
              </button>
            </div>
          )}

          <h3 className="text-2xl font-bold text-gray-700 -mb-6">Seu Dia</h3>

          <Historico />
        </div>
      </div>
    </>
  );
}

export default Home;
