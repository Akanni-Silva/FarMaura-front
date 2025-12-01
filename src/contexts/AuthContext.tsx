/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { buscar, login } from "../services/Service";
import type Remedio from "../models/Remedio";


interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
  getRemedios(): Promise<void>;
  remedios: Remedio[];
  tomei(remedio: Remedio): void
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContex = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  const [remedios, setRemedios] = useState<Remedio[]>([])
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);

    try {
      await login("/usuarios/logar", usuarioLogin, setUsuario);
     alert("O Usuário foi autenticado com sucesso!");
    } catch (error) {
      alert("Os Dados do usuário estão inconsistentes!");
    }
    setIsLoading(false);
  }
  function handleLogout() {
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: "",
    });
  }

  async function getRemedios() {
    try {
      setIsLoading(true);

      await buscar("/remedios", setRemedios, {
        headers: { Authorization: usuario.token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
    } finally {
      setIsLoading(false);
    }
  }

  /** 🟢 MARCAR COMO TOMADO */
    function tomei(remedio: Remedio) {
      setRemedios((prev) =>
        prev.map((r) => (r.id === remedio.id ? { ...r, foiTomadoHoje: true } : r))
      );
    }


// ► Zera "tomado" todos os dias às 00:00
  useEffect(() => {
    const verificarReset = setInterval(() => {
      const agora = new Date();
      if (agora.getHours() === 0 && agora.getMinutes() === 0) {
        setRemedios((prev) =>
          prev.map((r) => ({ ...r, foiTomadoHoje: false }))
        );
      }
    }, 60000); // verifica a cada 1 min

    return () => clearInterval(verificarReset);
  }, []);

  return (
    <AuthContex.Provider
      value={{ usuario, handleLogin, handleLogout, isLoading, getRemedios, remedios, tomei }}
    >
      {children}
    </AuthContex.Provider>
  );
}