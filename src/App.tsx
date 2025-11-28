import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";

import Home from "./pages/home/Home";

import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ListarPeriodos from "./components/periodos/listarPeriodos/ListarPeriodos";
import FormPeriodo from "./components/periodos/formPeriodo/FormPeriodo";
import DeletarPeriodo from "./components/periodos/deletarPeriodo/DeletarPeriodo";
import DeletarRemedio from "./components/remedio/deletarRemedio/DeletarRemedio";
import ListarRemedios from "./components/remedio/listarRemedios/ListarRemedios";
import FormRemedio from "./components/remedio/formRemedio/FormRemedio";
import Historico from "./pages/historico/Historico";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <div className=" bg-gray-300">
            <Navbar />
            <div className="min-h-[80vh] overflow-auto pb-10">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/remedios" element={<ListarRemedios />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/periodos" element={<ListarPeriodos />} />
                <Route path="/cadastrarperiodo" element={<FormPeriodo />} />
                <Route path="/editarperiodo/:id" element={<FormPeriodo />} />
                <Route
                  path="/deletarperiodo/:id"
                  element={<DeletarPeriodo />}
                />
                <Route path="/cadastrarremedio" element={<FormRemedio />} />
                <Route path="/historico" element={<Historico />} />
                <Route path="/editarremedio/:id" element={<FormRemedio />} />
                <Route
                  path="/deletarremedio/:id"
                  element={<DeletarRemedio />}
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
