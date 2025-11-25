import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Periodo from "../../../models/Periodo";
import { AuthContex } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormPeriodo() {
  const navigate = useNavigate();

  const [periodo, setPeriodo] = useState<Periodo>({} as Periodo);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContex);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/periodos/${id}`, setPeriodo, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
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

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPeriodo({
      ...periodo,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/periodos");
  }

  async function gerarNovoPeriodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/periodos`, periodo, setPeriodo, {
          headers: { Authorization: token },
        });
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          alert("Erro ao atualizar o Periodo.");
        }
      }
    } else {
      try {
        await cadastrar(`/periodos`, periodo, setPeriodo, {
          headers: { Authorization: token },
        });
        alert("O Periodo foi cadastrado com sucesso!");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          alert("Erro ao cadastrar o Periodo.");
        }
      }
    }
    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container flex flex-col mx-auto items-center p-3 bg-white  rounded-2xl justify-center w-full min-h-screen">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Periodo" : "Cadastrar Periodo"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoPeriodo}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">
            {id === undefined ? "Cadastrar Perido" : "Editar Perido"}
          </label>
          <input
            type="text"
            placeholder="Ex: Após Almoçar"
            name="nome"
            className="border-2 border-slate-700 rounded p-2"
            value={periodo.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <input
            type="time"
            placeholder="Ex: 12:00"
            name="horario"
            className="border-2 border-slate-700 rounded p-2"
            value={periodo.horario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button
          className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={24} />
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormPeriodo;
