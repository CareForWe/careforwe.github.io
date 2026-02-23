'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../../supabaseClient';

type UserRole = 'USER' | 'ADMIN' | null;

interface AuthContextType {
    user: User | null; // user info = name, email
    session: Session | null;
    role: UserRole; // role from public.user_roles
    loading: boolean; //Is the app still checking if the user is loggin?
    signIn: () => Promise<void>; // Function to sign in
    signOut: () => Promise<void>; // Function to sign out
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const fetchUserRole = async (userId: string): Promise<UserRole> => {
    const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

    if (error || !data) {
        // No role found — default to USER
        return 'USER';
    }

    const role = data.role as string;
    if (role === 'ADMIN') return 'ADMIN';
    return 'USER';
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [role, setRole] = useState<UserRole>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                const userRole = await fetchUserRole(session.user.id);
                setRole(userRole);
            } else {
                setRole(null);
            }
            setLoading(false);
        });

        // Listen for auth state changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setLoading(true);
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                const userRole = await fetchUserRole(session.user.id);
                setRole(userRole);
            } else {
                setRole(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async () => {
        // This function is mainly for type compatibility
        // Actual sign in is handled in the SignIn component
        // But we can trigger a session refresh if needed
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
            const userRole = await fetchUserRole(session.user.id);
            setRole(userRole);
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        setRole(null);
    };

    const value: AuthContextType = {
        user,
        session,
        role,
        loading,
        signIn,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
