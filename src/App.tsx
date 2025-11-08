import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";

import Home from "./pages/home/Home";
import Agenda from "./pages/agenda/Agenda";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ListarPeriodos from "./components/periodos/listarPeriodos/ListarPeriodos";
import FormPeriodo from "./components/periodos/formPeriodo/FormPeriodo";
import DeletarPeriodo from "./components/periodos/deletarPeriodo/DeletarPeriodo";
import FormRmedio from "./components/remedio/formRemedio/FormRmedio";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/periodos" element={<ListarPeriodos />} />
              <Route path="/cadastrarperiodo" element={<FormPeriodo />} />
              <Route path="/editarperiodo/:id" element={<FormPeriodo />} />
              <Route path="/deletarperiodo/:id" element={<DeletarPeriodo />} />
              <Route path="/cadastrarremedio" element={<FormRmedio />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
