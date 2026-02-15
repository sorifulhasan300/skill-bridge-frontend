"use client";

import { getSession } from "@/action/action";
import { Session } from "@/types/session.type";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  session: Session | null;
  setSession: (session: Session | null) => void;
  refreshAuth: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: Session;
}) => {
  const [session, setSession] = useState<Session | null>(initialSession);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initialSession) {
      setSession(initialSession);
    }

    setIsLoading(false);
  }, [initialSession]);

  const refreshAuth = async () => {
    setIsLoading(true);
    try {
      const { data: session } = await getSession();
      setSession(session);
    } catch (err) {
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, setSession, refreshAuth, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
