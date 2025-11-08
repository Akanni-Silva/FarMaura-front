import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import type Remedio from '../../../models/Remedio';
import { AuthContex } from '../../../contexts/AuthContext';
import { buscar, deletar } from '../../../services/Service';
import { ClipLoader } from 'react-spinners';

function DeletarRemedio() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [remedio, setRemedio] = useState<Remedio>({} as Remedio);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContex);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/remedios/${id}`, setRemedio, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado" );
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarRemedio() {
    setIsLoading(true);

    try {
      await deletar(`/remedios/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      alert("Postagem apagada com sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        alert("Erro ao deletar a postagem.");
      }
    }
    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/agenda");
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar Postagem</h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar a postagem a seguir ?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Remedio
        </header>
        <div className="p-4">
          <p className="text-xl h-full">{remedio.nome}</p>
          <p>{remedio.periodo?.nome}</p>
        </div>
        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="text-slate-100 bg-indigo-400 hover:bg-indigo-600 w-full py-2"
            onClick={deletarRemedio}
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

export default DeletarRemedio