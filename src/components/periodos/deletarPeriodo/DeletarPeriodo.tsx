import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Periodo from "../../../models/Periodo";
import { AuthContex } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader, SyncLoader } from "react-spinners";

function DeletarPeriodo() {
  const navigate = useNavigate();

  const [perido, setPerido] = useState<Periodo>({} as Periodo);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContex);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    setIsLoading(true);
    try {
      await buscar(`/periodos/${id}`, setPerido, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
    setIsLoading(false);
  }
  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  });

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarPeriodo() {
    setIsLoading(true);
    try {
      await deletar(`/periodos/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      alert("Periodo apagado com sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        alert("Erro ao Deletar o Periodo.");
      }
    }
    setIsLoading(false);
    retornar();
  }
  function retornar() {
    navigate("/periodos");
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar Periodo</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza que deseja apagar o Periodo a seguir?
      </p>
      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Periodo
        </header>
        <p className="p-8 text-3xl bg-slate-200 h-full">
          {isLoading ? (
            <div className="flex justify-center">
              <SyncLoader color="#283593" size={5} />
            </div>
          ) : (
            <div>
              {" "}
              <div>{perido.nome}</div>
              <div>{perido.horario}</div>
            </div>
          )}
        </p>
        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="text-slate-100 bg-indigo-400 hover:bg-indigo-600 w-full flex items-center justify-center"
            onClick={deletarPeriodo}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarPeriodo;
