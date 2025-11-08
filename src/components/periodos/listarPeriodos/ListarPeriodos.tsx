import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners'
import type Periodo from '../../../models/Periodo';
import { AuthContex } from '../../../contexts/AuthContext';
import { buscar } from '../../../services/Service';
import CardPeriodo from '../cardPeriodo/CardPeriodo';

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
      {isLoading && (
        <div className="flex justify-center my-8">
          {" "}
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          {!isLoading && periodos.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhum Periodo foi encontrado!
            </span>
          )}
          <Link to="/cadastrarperiodo"> <button className='bg-amber-300'>+</button></Link>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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