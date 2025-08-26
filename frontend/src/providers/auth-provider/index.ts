import type { AuthProvider } from "@refinedev/core";
import { TOKEN_KEY } from "@/utils/constants";
import { axiosInstance } from "../axios";


export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const { data, status } =  await axiosInstance.post("/auth/login", { email, password });
      if (status === 200) {
        localStorage.setItem(TOKEN_KEY, data.token);

        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: any) {
      const errorObj = error?.response?.data?.error?.message

      return {
        success: false,
        error: {
          message: "Login failed",
          name: errorObj || "Invalid email or password",
        },
      };
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  },
  register: async ({ nombre, email, password }) => {
    try {
      const { data, status } = await axiosInstance.post("/auth/registro", { nombre: "simon", email, password });
      if (status === 201) {
        localStorage.setItem(TOKEN_KEY, data.token);

        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: any) {
      const errorObj = error?.response?.data?.error?.message

      return {
        success: false,
        error: {
          message: "Register failed",
          name: errorObj || "Invalid email or password",
        },
      };
    }

    return {
      success: false,
      error: {
        message: "Register failed",
        name: "Invalid email or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Authentication failed",
        name: "Token not found",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }

    const { data, status } = await axiosInstance.get("/auth/perfil");
    if (status === 200) {
      const { id, nombre: name, email } = data;
      return {
        id,
        name,
        email,
      };
    }

    return null;
  },
};
