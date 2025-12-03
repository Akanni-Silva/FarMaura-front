/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, type ReactNode } from "react";
import type Remedio from "../../models/Remedio";
import { AuthContex } from "../../contexts/AuthContext";
import Historico from "../listarStatus/ListarStatus";
import ListarStatus from "../listarStatus/ListarStatus";

function Home() {
  const navigate = useNavigate();

  const [isLoading] = useState(false);
  // const [remedios, setRemedios] = useState<Remedio[]>([]);

  const { usuario, getRemedios, tomei, remedios } = useContext(AuthContex);
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
    getRemedios();
  }, []);

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

  const meusRemedios = remedios.filter(r => r.usuario?.id === usuario.id);
  const remedioDestaque = getRemedioMaisProximo(meusRemedios);

  let component: ReactNode;

  if(remedioDestaque){
    component=(<div
              className="bg-linear-to-r from-green-500 to-sky-500 
              text-white rounded-3xl shadow-xl p-6 -mt-6 container w-[95vw]"
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
                hover:scale-102 transition-all duration-300"
                onClick={() => tomei(remedioDestaque)} // <-- FIX AQUI
              >
                TOMEI!
              </button>
            </div>)
  } else{
    component=(<div
              className="bg-linear-to-r from-green-500 to-sky-500 
              text-white rounded-3xl shadow-xl p-6 -mt-6 container w-[95vw]"
            >
              <p className="text-lg font-semibold opacity-90 tracking-wide ">
                PRÓXIMA DOSE:
              </p>

              <h2 className="text-4xl font-extrabold capitalize text-center">
                Nenhum remedio Pendente Hoje
              </h2>

              <p className="text-base mt-2 mb-6 opacity-90"></p>

              <button
                disabled
                className="w-full bg-linear-to-r from-green-400 to-sky-400
                text-white text-2xl font-extrabold py-4 rounded-full shadow-xl 
                "
              >
                TOMEI!
              </button>
            </div>)
  }

  return (
    <>
      <div className=" flex justify-center min-h-screen relative">
        <div className="p-4 flex flex-col gap-6">
          {!isLoading && !remedioDestaque && (
            <>{component}</>
          )}

          {!isLoading && remedioDestaque && (
            <>{component}</>
          )}

          <h3 className="text-2xl font-bold text-gray-700 -mb-6 text-center">Seu Dia</h3>

          <ListarStatus clicou={true} />
        </div>
      </div>
    </>
  );
}

export default Home;
