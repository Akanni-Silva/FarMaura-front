/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode } from "react";
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
  const StatusRemedioDia = "remediosTomadosHoje";

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
      await buscar("/remedios", (remediosDaApi: Remedio[]) => {
        const hoje = new Date().toISOString().split('T')[0];
        const cookieValue = Cookies.get(StatusRemedioDia);
        let takenIds: number[] = [];

        if (cookieValue) {
          try {
            const parsedData = JSON.parse(cookieValue);
            // Se o cookie for de hoje, usa a lista de IDs.
            if (parsedData.date === hoje) {
              takenIds = parsedData.takenIds;
            } else {
              // Se não for de hoje, o cookie é antigo e deve ser removido.
              Cookies.remove(StatusRemedioDia);
            }
          } catch (error) {
            alert("Erro ao parsear cookie de remédios:");
            // Se o cookie antigo estiver em formato inválido, remove.
            Cookies.remove(StatusRemedioDia);
          }
        }

        // Mapeia os remédios da API, definindo `foiTomadoHoje` com base na lista de IDs.
        // Se a lista `takenIds` estiver vazia (seja por um novo dia ou por erro no cookie),
        // `foiTomadoHoje` será `false` para todos.
        const remediosParaExibir = remediosDaApi.map(r => ({
          ...r,
          foiTomadoHoje: takenIds.includes(r.id)
        }));

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

    const hoje = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const cookieValue = Cookies.get(StatusRemedioDia);
    let cookieData = { date: hoje, takenIds: [] as number[] };

    if (cookieValue) {
        try {
            const parsedData = JSON.parse(cookieValue);
            // Se o cookie é de hoje, usa os dados dele. Senão, começa um novo.
            if (parsedData.date === hoje) {
                cookieData = parsedData;
            }
        } catch (error) {
            alert("Erro ao parsear cookie de remédios");
            // Se o cookie antigo estiver em formato inválido, ele será sobrescrito.
        }
    }

    if (!cookieData.takenIds.includes(remedio.id)) {
      cookieData.takenIds.push(remedio.id);
      // O cookie expira em 1 dia
      Cookies.set(StatusRemedioDia, JSON.stringify(cookieData), { expires: 1 });
    }
  }



  return (
    <AuthContex.Provider
      value={{ usuario, handleLogin, handleLogout, isLoading, getRemedios, remedios, tomei }}
    >
      {children}
    </AuthContex.Provider>
  );
}