import React, { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import type Periodo from '../../../models/Periodo';
import type Remedio from '../../../models/Remedio';
import { AuthContex } from '../../../contexts/AuthContext';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { ClipLoader } from 'react-spinners';

function FormRmedio() {
 const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [periodo, setPeriodo] = useState<Periodo>({} as Periodo);

  const [remedio, setRemedio] = useState<Remedio>({} as Remedio);

  const { usuario, handleLogout } = useContext(AuthContex);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarRemedioPorId(id: string) {
    try {
      await buscar(`/remedios/${id}`, setRemedio, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  async function buscarPeriodoPorId(id: string) {
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

  async function buscarPeriodos() {
    try {
      await buscar("/periodos", setPeriodos, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes(401)) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado",);
      navigate("/");
    }
  },[token]);

  useEffect(() => {
    buscarPeriodos();
    if (id !== undefined) {
      buscarRemedioPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setRemedio({ ...remedio, periodo: periodo });
  }, [periodo]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setRemedio({
      ...remedio,
      [e.target.name]: e.target.value,
      periodo: periodo,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate("/agenda");
  }

  async function gerarNovoRemedio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);



    if (id !== undefined) {
      try {
        await atualizar(`/remedios`, remedio, setRemedio, {
          headers: { Authorization: token },
        });

        alert("Postagem atualizada com sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          alert("Erro ao atualizar a Postagem.");
        }
      }
    } else {
      try {
        await cadastrar(`/remedios`, remedio, setRemedio, {
          headers: { Authorization: token },
        });
        alert("O Rmedios foi cadastrado com sucesso!",);
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          alert("Erro ao cadastrar o Remedio.");
        }
      }
    }
    setIsLoading(false);
    retornar();
  }
  const carregandoPeriodo = periodo.nome === "";

  return (
    <div className="container flex flex-col mx-auto items-center p-3 bg-white w-3xl rounded-2xl">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoRemedio}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Nome do Remedio</label>
          <input
            type="text"
            placeholder="nome"
            name="nome"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={remedio.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Dosagem do remedio</label>
          <input
            type="number"
            step='0.01' 
            min ='0'
            placeholder="mg"
            name="doseMg"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={remedio.doseMg}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Periodo do Remedio</p>
          <select
            name="periodo"
            id="periodo"
            className="border p-2 border-slate-800 rounded"
            onChange={(e) => buscarPeriodoPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled>
              Selecione um Periodo
            </option>
            {periodos.map((periodo) => (
              <>
                <option value={periodo.id}>{periodo.nome}</option>
              </>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
          disabled={carregandoPeriodo}
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

export default FormRmedio