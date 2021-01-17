import axios from "axios";

type AuthenticationResult = {
  token: string;
  success: boolean;
  errors: Array<string>;
}

export async function registerUser(userData: any): Promise<AuthenticationResult> {
  try {
    const response = await axios.post("user/register", userData);
    const result = await response.data;
    localStorage.setItem("user", result.token);
    return result;
  } catch(error) {
    return error.response.data;
  }
}

export async function loginUser(userData: any): Promise<AuthenticationResult> {
  try {
    const response = await axios.post("user/login", userData);
    const result = await response.data;
    localStorage.setItem("user", result.token);
    return result;
  } catch(error) {
    return error.response.data;
  }
}

export function logoutUser(): void {
  localStorage.removeItem("user");
}
