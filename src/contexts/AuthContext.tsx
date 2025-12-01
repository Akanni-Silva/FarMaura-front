/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, type ReactNode } from "react";
import Cookies from "js-cookie"; // Importando a biblioteca de cookies
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
  tomei(remedio: Remedio): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContex = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const USER_COOKIE = "usuarioAuth";
  const TAKEN_TODAY_COOKIE = "remediosTomadosHoje";

  const [usuario, setUsuario] = useState<UsuarioLogin>(() => {
    const cookie = Cookies.get(USER_COOKIE);
    return cookie ? JSON.parse(cookie) : {
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: "",
    };
  });

  const [remedios, setRemedios] = useState<Remedio[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);
    try {
      // Cria um callback para receber os dados do usuário do 'login'
      const loginCallback = (dadosUsuario: UsuarioLogin) => {
        setUsuario(dadosUsuario); // Atualiza o estado
        Cookies.set(USER_COOKIE, JSON.stringify(dadosUsuario)); // Salva no cookie
      };

      await login("/usuarios/logar", usuarioLogin, loginCallback);
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
    Cookies.remove(USER_COOKIE); // Limpa o cookie do usuário
  }

  async function getRemedios() {
    try {
      setIsLoading(true);
      // O callback do `buscar` recebe os remédios da API
      await buscar("/remedios", (remediosDaApi: Remedio[]) => {
          // Lê o cookie
          const cookieValue = Cookies.get(TAKEN_TODAY_COOKIE);
          const takenIds: number[] = cookieValue ? JSON.parse(cookieValue) : [];
          
          let remediosParaExibir = remediosDaApi;

          // Se existem IDs no cookie, atualiza a lista vinda da API
          if (takenIds.length > 0) {
            remediosParaExibir = remediosDaApi.map(r => ({
                ...r,
                foiTomadoHoje: takenIds.includes(r.id)
            }));
          }
          // Define o estado com a lista correta (original ou atualizada)
          setRemedios(remediosParaExibir);

      }, {
        headers: { Authorization: usuario.token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
    } finally {
      setIsLoading(false);
    }
  }

  /** 🟢 MARCAR COMO TOMADO (com persistência em cookie) */
  function tomei(remedio: Remedio) {
    // Atualiza o estado no React
    setRemedios((prev) =>
      prev.map((r) => (r.id === remedio.id ? { ...r, foiTomadoHoje: true } : r))
    );

    // Salva o ID no cookie
    const cookieValue = Cookies.get(TAKEN_TODAY_COOKIE);
    const takenIds: number[] = cookieValue ? JSON.parse(cookieValue) : [];
    if (!takenIds.includes(remedio.id)) {
      takenIds.push(remedio.id);
      // O cookie expira em 1 dia, sincronizado com a lógica de reset
      Cookies.set(TAKEN_TODAY_COOKIE, JSON.stringify(takenIds), { expires: 1 });
    }
  }

  // ► Zera "tomado" todos os dias às 00:00
  useEffect(() => {
    const verificarReset = setInterval(() => {
      const agora = new Date();
      if (agora.getHours() === 0 && agora.getMinutes() === 0) {
        setRemedios((prev) =>
          prev.map((r) => ({ ...r, foiTomadoHoje: false }))
        );
        Cookies.remove(TAKEN_TODAY_COOKIE); // Limpa o cookie à meia-noite
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