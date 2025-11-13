import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContex } from "../../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContex);

  function logout() {
    handleLogout();
    alert("O Usuário foi desconectado com sucesso!");
    navigate("/");
  }

  return (
    <>
      <div className="w-full flex justify-center py-4 bg-blue-600 text-white">
        <div className="container flex justify-between text-lg mx-8">
          <Link to="/" className="text-2xl font-bold hover:underline">
            Farmaura
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/perfil" className="hover:underline">
              <img
                src="https://i.imgur.com/pK6vSCy.png"
                className="h-10 rounded-full hover:h-12 duration-500"
                alt="nome"
              />
            </Link>
            <Link to="/remedios" className="hover:underline">
              Remedios
            </Link>
            <Link to="/periodos " className="hover:underline">
              Periodos
            </Link>
            <Link to="" onClick={logout} className="hover:underline">
              Sair
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
