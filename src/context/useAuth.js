import { useContext } from "react";
import { AuthContext } from "./AuthContextObj";

export const useAuth = () => useContext(AuthContext);