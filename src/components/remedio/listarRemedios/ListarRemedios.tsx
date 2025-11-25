import { useContext, useEffect, useState } from "react";
import CardRemedio from "../cardRemdio/CardRemedio";
import type Remedio from "../../../models/Remedio";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContex } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import { PlusIcon } from "@phosphor-icons/react";

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

  const location = useLocation();

  return (
    <>
      <div className="relative">
        {isLoading ? (
          <div className="flex justify-center w-full my-8">
            <SyncLoader color="#312e81" size={32} />
          </div>
        ) : (
          <>
            {/* Botão Flutuante - aparece apenas em /meusremedios */}
            {location.pathname === "/remedios" && (
              <button
                onClick={() => navigate("/cadastrarremedio")}
                className=" right-6 top-18 bg-linear-to-r from-green-500 to-sky-500 text-white p-4 
                rounded-full shadow-xl hover:shadow-2xl 
                hover:scale-105 transition-all duration-300 z-50 fixed"
              >
                <PlusIcon color="#fff" size={28} weight="bold" />
              </button>
            )}
          </>
        )}

        {/* Conteúdo da listagem */}
        <div className="flex justify-center w-full my-4">
          <div className="container flex flex-col mx-2">
            {!isLoading && remedios.length === 0 && (
              <span className="text-3xl text-center my-8">
                Nenhuma Remedio foi encontrado!
              </span>
            )}

            <div
              className="
          container mx-auto mb-4 mt-2
          grid grid-cols-1  
          lg:grid-cols-3 gap-4
        "
            >
              {remedios.map((remedio) => (
                <CardRemedio key={remedio.id} remedio={remedio} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListarRemedios;
