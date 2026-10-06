import { TOKEN_KEY } from "../constants/token-constant";
import { getToken } from "../utils/token.util";

interface IUseTokenReturn {
  /**
   *
   * @returns get token from localStorage
   */
  getToken: () => string | null;
  /**
   *
   * @param token
   * @returns set token in localStorage
   */
  setToken: (token: string) => void;
  /**
   *
   * @returns remove token from localStorage
   */
  removeToken: () => void;
}

export default function useToken(): IUseTokenReturn {
  
  function setToken(token: string) {
    return localStorage.setItem(TOKEN_KEY, token);
  }
  function removeToken() {
    return localStorage.removeItem(TOKEN_KEY);
  }

  return { getToken, setToken, removeToken };
}
