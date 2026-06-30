import { JWTPayload } from "@/types/auth";
import { jwtDecode } from "jwt-decode";

export function decodedToken(token:string): JWTPayload | null {
    try {
    return jwtDecode<JWTPayload>(token);
  } catch {
    return null;
  } 
}

export function isTokenValid(token: string): boolean {
  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) return false;
    return decodedToken.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}