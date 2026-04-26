import {createContext, type ReactElement, useContext, useState} from "react";

type ErrorContextType = {
    error: string | null;
    setError: (msg: string | null) => void;
};

const ErrorContext = createContext<ErrorContextType | null>(null);

export const ErrorProvider = ({ children }: { children: React.ReactNode }): ReactElement => {
    const [error, setError] = useState<string | null>(null);

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = (): ErrorContextType => {
    const ctx = useContext(ErrorContext);
    if (!ctx) throw new Error("useError must be inside ErrorProvider");
    return ctx;
};