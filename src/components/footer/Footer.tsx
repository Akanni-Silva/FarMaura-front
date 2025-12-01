/* eslint-disable prefer-const */
import {
  BankIcon,
  CalendarCheckIcon,
  DeskIcon,
  GithubLogoIcon,
  HouseIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  PillIcon,
  SignOutIcon,
} from "@phosphor-icons/react";
import { useContext, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContex } from "../../contexts/AuthContext";

function Footer() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContex);

  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-sky-600" // ativo (azul)
      : "text-gray-500"; // inativo

  let data = new Date().getFullYear();

  function logout() {
    handleLogout();
    alert("O Usuário foi desconectado com sucesso!");
    navigate("/");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div className="bg-sky-100 fixed bottom-0 left-0 w-full py-2 shadow-inner z-50">
        <div className="flex justify-around text-center">
          <Link
            to="/home"
            className={`flex flex-col items-center ${isActive("/home")}`}
          >
            <HouseIcon size={28} weight="bold" />
            <span className="text-sm">Início</span>
          </Link>

          <Link
            to="/remedios"
            className={`flex flex-col items-center ${isActive("/remedios")}`}
          >
            <PillIcon size={28} weight="bold" />
            <span className="text-sm">Meus Remédios</span>
          </Link>

          <Link
            to="/periodos"
            className={`flex flex-col items-center ${isActive("/periodos")}`}
          >
            <CalendarCheckIcon size={28} weight="bold" />
            <span className="text-sm">Periodos</span>
          </Link>

          <Link
            to=""
            onClick={logout}
            className={`flex flex-col items-center text-red-500`}
          >
            <SignOutIcon size={28} weight="bold" />
            <span className="text-sm">Sair</span>
          </Link>
        </div>
      </div>
    );
  } else {
    component = (
      <div
        className="flex justify-center  bg-linear-to-r from-green-500 to-sky-500 
                          text-white"
      >
        <div className="container flex flex-col items-center py-3">
          <p className="text-xl font-bold">Farmaura | Copyright: {data}</p>
          <p className="text-lg">Acesse nossas redes sociais</p>
          <div className="flex gap-2">
            <a
              href="https://www.linkedin.com/in/akannisilva/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinLogoIcon size={30} weight="bold" />
            </a>
            <a
              href="https://github.com/Akanni-codes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubLogoIcon size={30} weight="bold" />
            </a>
            <a
              href="https://www.instagram.com/0batayie/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramLogoIcon size={30} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{component}</>;
}

export default Footer;
