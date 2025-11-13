import { useContext, useEffect, useState } from "react";
import CardRemedio from "../cardRemdio/CardRemedio";
import type Remedio from "../../../models/Remedio";
import { useNavigate } from "react-router-dom";
import { AuthContex } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";

function ListarRemedios() {
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

  return (
    <>
      <div className="flex justify-center mt-6 sm:mt-8 mb-6 sm:mb-8">
        <button
          onClick={() => navigate("/cadastrarremedio")}
          className="bg-linear-to-r from-orange-700 to-green-600 text-white font-semibold 
              px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-xl 
              shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-out text-sm sm:text-base cursor-pointer"
        >
          + Nova Atividade
        </button>
      </div>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col mx-2">
          {!isLoading && remedios.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhuma Remedio foi encontrada!
            </span>
          )}
          <div
            className="container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 
                        lg:grid-cols-3 gap-4"
          >
            {remedios.map((remedio) => (
              <CardRemedio key={remedio.id} remedio={remedio} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListarRemedios;
