import axios from "axios";

export async function registerUser(userData: any): Promise<boolean> {
  try {
    const response = await axios.post("user/register", userData);
    const result = await response.data;
    localStorage.setItem("user", result.token);
    return true;
  } catch(error) {
    return false;
	}
}

export async function loginUser(userData: any): Promise<boolean> {
  try {
    const response = await axios.post("user/login", userData);
    const result = await response.data;
    localStorage.setItem("user", result.token);
    return true;
  } catch (error) {
    return false;
  }
}

export function logoutUser(): void {
  localStorage.removeItem("user");
}
