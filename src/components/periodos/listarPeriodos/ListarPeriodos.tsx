import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners'
import type Periodo from '../../../models/Periodo';
import { AuthContex } from '../../../contexts/AuthContext';
import { buscar } from '../../../services/Service';
import CardPeriodo from '../cardPeriodo/CardPeriodo';
import { PlusIcon } from '@phosphor-icons/react';

function ListarPeriodos() {

    const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [periodos, setPeriodos] = useState<Periodo[]>([]);

  const { usuario, handleLogout } = useContext(AuthContex);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!",);
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarPeriodos();
  }, [periodos.length]);

  async function buscarPeriodos() {
    try {
      setIsLoading(true);

      await buscar("/periodos", setPeriodos, {
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
      {isLoading ? (
              <div className="flex justify-center w-full my-8">
                <SyncLoader color="#312e81" size={32} />
              </div>
            ) : (
              <div className="flex justify-center">
                <button
                  onClick={() => navigate("/cadastrarperiodo")}
                  className="fixed right-6 top-125 bg-linear-to-r from-green-500 to-sky-500 text-white p-4 
                rounded-full shadow-xl hover:shadow-2xl 
                hover:scale-105 transition-all duration-300 z-50"
                >
                  <PlusIcon color="#ffff" size={28} weight="bold" />
                </button>
              </div>
            )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          {!isLoading && periodos.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhum Periodo foi encontrado!
            </span>
          )}
          <h3 className="text-xl font-bold text-center py-3">Periodos do Dia</h3>
          <div className="
          container mx-auto mb-4 mt-2
          grid grid-cols-1  
          lg:grid-cols-3 gap-4
        ">
            {periodos.map((periodo) => (
              <CardPeriodo key={periodo.id} periodo={periodo} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListarPeriodos