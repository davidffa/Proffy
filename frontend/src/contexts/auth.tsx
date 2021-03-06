import React, { createContext, useState, useEffect, useContext } from 'react';

import api from '../services/api';

interface ScheduleItem {
    class_id?: number,
    week_day: number,
    from: string,
    to: string;
}

interface User {
    name: string,
    surname: string,
    email: string;
    whatsapp: string | null;
    bio: string | null;
    avatar: string | null;
    cost?: number;
    schedule?: [ScheduleItem];
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    signIn(email: string, password: string, remember: boolean): Promise<void>
    signOut(): void;
    reloadData(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStoragedData() {
            
            const storagedToken = localStorage.getItem('token');

            if (storagedToken) {
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

                try {
                    const res = await api.post('profile', {
                        subject: ''
                    });

                    setUser(res.data);
                }catch (err) {
                    if (err.response && err.response.status === 401)
                        localStorage.clear();
                }
            }
            setLoading(false)
        }   

        loadStoragedData();
    }, []);

    async function signIn(email: string, password: string, remember: boolean) {
        try {
            const res = await api.post('login', {
                email,
                password
            });

            api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
            setUser(res.data.user);
            
            if (remember) {
                try {
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

    async function reloadData() {
        try {
            const res = await api.post('profile', {
                subject: ''
            });

            setUser(res.data);
        }catch (err) {
            if (err.response && err.response.status === 401)
                localStorage.clear();
        }
    }

    if (loading) {
        return <div/>
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, reloadData }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export default AuthContext;