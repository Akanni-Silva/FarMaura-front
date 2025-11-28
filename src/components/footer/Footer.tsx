/* eslint-disable prefer-const */
import {
  BankIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { useContext, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContex } from "../../contexts/AuthContext";

function Footer() {
  const navigate = useNavigate();

  const { usuario } = useContext(AuthContex);

  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-sky-600" // ativo (azul)
      : "text-gray-500"; // inativo

  let data = new Date().getFullYear();

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div className="bg-sky-100 fixed bottom-0 left-0 w-full py-2 shadow-inner z-50">
        <div className="flex justify-around text-center">
          <Link
            to="/home"
            className={`flex flex-col items-center ${isActive("/home")}`}
          >
            <BankIcon size={28} weight="bold" />
            <span className="text-sm">Início</span>
          </Link>

          <Link
            to="/remedios"
            className={`flex flex-col items-center ${isActive("/remedios")}`}
          >
            <BankIcon size={28} weight="bold" />
            <span className="text-sm">Meus Remédios</span>
          </Link>

          <Link
            to="/periodos"
            className={`flex flex-col items-center ${isActive("/periodos")}`}
          >
            <BankIcon size={28} weight="bold" />
            <span className="text-sm">Periodos</span>
          </Link>

          <Link
            to="/cuidador"
            className={`flex flex-col items-center ${isActive("/cuidador")}`}
          >
            <BankIcon size={28} weight="bold" />
            <span className="text-sm">Cuidador</span>
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
