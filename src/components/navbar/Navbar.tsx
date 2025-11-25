import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContex } from "../../contexts/AuthContext";
import { ArrowLeftIcon, CalendarBlankIcon } from "@phosphor-icons/react";

function Navbar() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContex);

  function logout() {
    handleLogout();
    alert("O Usuário foi desconectado com sucesso!");
    navigate("/");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div
        className="w-full flex justify-center py-4 bg-linear-to-r from-green-500 to-sky-500  text-white"
      >
        <div className="container flex justify-between text-lg mx-8">
          <span className="font-bold text-2xl flex items-center gap-3">
            <Link to="" onClick={logout}>
              <ArrowLeftIcon size={30} weight="bold" />
            </Link>
            Olá, {usuario.nome}!
          </span> 
          <Link to='/periodos'>
          <CalendarBlankIcon size={35} weight="bold" />
          </Link>
          
        </div>
      </div>
    );
  } else {
    component = (
      <div
        className="w-full flex justify-center py-4 bg-linear-to-r from-green-500 to-sky-500 text-white"
      >
        <div className="container flex justify-between text-lg mx-8">
          <Link to="/" className="text-2xl font-bold hover:underline">
            Farmaura
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/" className="hover:underline">
              Entrar
            </Link>
            <Link to="/cadastro " className="hover:underline">
              Cadastrar
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return <>{component}</>;
}

export default Navbar;
