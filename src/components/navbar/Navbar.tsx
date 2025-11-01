import { Link } from "react-router-dom";

function Navbar() {
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
            <Link to="/postagens" className="hover:underline">
              Postagens
            </Link>
            <Link to="/temas " className="hover:underline">
              Temas
            </Link>
            <Link to="/cadastrartema " className="hover:underline">
              Cadastrar Tema
            </Link>
            <Link to="/" className="hover:underline">
              Sair
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
