import { TOKEN_KEY } from "../constants/token-constant";

 export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
