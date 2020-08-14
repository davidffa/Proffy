import React, { createContext, useState, useEffect, useContext } from 'react';

import api from '../services/api';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    signIn(email: string, password: string, remember: boolean): Promise<void>
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<object | null>(null);

    useEffect(() => {
        async function loadStoragedData() {
            
            const storagedToken = localStorage.getItem('token');

            if (storagedToken) {
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
                
                try {
                    const res = await api.get('profile');
                    setUser(res.data);
                }catch (err) {
                    localStorage.clear();
                }
            }
        }   

        loadStoragedData();
    }, []);

    async function signIn(email: string, password: string, remember: boolean) {
        try {
            const res = await api.post('login', {
                email,
                password
            });

            setUser(res.data.user);
            api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
            
            if (remember) {
                try {
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    localStorage.setItem('token', res.data.token);
                } catch(err) {
                    alert('Ocorreu um erro! Ative o armazenamento local do seu browser.')
                } 
            }      
        }catch (err) {
            alert('Email ou password incorretos!');
        }
    }

    function signOut() {
        setUser(null);
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export default AuthContext;