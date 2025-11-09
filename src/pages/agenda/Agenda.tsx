import { useContext, useEffect, useState } from "react";
import CardRemedio from "../../components/remedio/cardRemdio/CardRemedio";
import type Remedio from "../../models/Remedio";
import { Link, useNavigate } from "react-router-dom";
import { AuthContex } from "../../contexts/AuthContext";
import { buscar } from "../../services/Service";
import { SyncLoader } from "react-spinners";

function Agenda() {
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
      <div className="grid grid-flow-col min-h-[80vh] p-0 mx-0 text-white ">
        <div className="flex flex-col bg-blue-600 max-w-[20vw] items-center justify-around font-semibold">
          <Link to="/cadastrarremedio">
            <p className="ml-2 ">Agendar novo remedio</p>
          </Link>
          <p className="ml-2 ">Colsultar Periodos</p>
          <p className="ml-2 ">Agendar novo remedio</p>
          <p className="ml-2 ">Agendar novo remedio</p>
        </div>

        <div className="bg-emerald-500 min-w-[80vw] overflow-hidden">
          <div className="container w-1/3 mx-auto">
            <h1 className="text-4xl text-center my-4">Dia</h1>
            <p className="text-center font-semibold mb-4">
              Voce tem os seguintes remedios hoje
            </p>
            <div className="container flex flex-col-reverse overflow-y-scroll thin-scroll min-w-xl">
              {isLoading && (
                <div className="flex justify-center items-center h-full">
                  <SyncLoader color="#D97652" size={24} />
                </div>
              )}
              {!isLoading && remedios.length === 0 && (
                <span className="text-3xl text-center my-8">
                  Nenhuma corrida foi encontrada
                </span>
              )}
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

export default Agenda;
