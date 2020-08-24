import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { AppLoading } from 'expo';
import { Alert } from 'react-native';

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
            
            const storagedToken = await AsyncStorage.getItem('token');

            if (storagedToken) {
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

                try {
                    const res = await api.post('profile', {
                        subject: ''
                    });

                    setUser(res.data);
                }catch (err) {
                    if (err.response && err.response.status === 401)
                        await AsyncStorage.removeItem('token');
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
                await AsyncStorage.setItem('token', res.data.token);
            }      
        }catch (err) {
            Alert.alert('Erro', 'Email ou password incorretos!');
        }
    }

    async function signOut() {
        setUser(null);
        await AsyncStorage.removeItem('token');
    }

    async function reloadData() {
        try {
            const res = await api.post('profile', {
                subject: ''
            });

            setUser(res.data);
        }catch (err) {
            if (err.response && err.response.status === 401)
                await AsyncStorage.removeItem('token');
        }
    }

    if (loading) {
        return <AppLoading />
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