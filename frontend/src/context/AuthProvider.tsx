import React  from "react";
import { useGetIdentity, useLogout } from "@refinedev/core";
import type { User } from "@/types";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    isAuthenticated: false,
    logout: () => { },
    isLoading: false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: fetchedUser, isLoading } = useGetIdentity<User>();
    const { mutate: logoutMutate } = useLogout();
    const [user, setUser] = React.useState<User | null>(null);


    React.useEffect(() => {
        if (!isLoading && fetchedUser) {
            setUser(fetchedUser);
        }
    }, [fetchedUser, isLoading]);

    const logout = () => {
        setUser(null);
        logoutMutate();
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
