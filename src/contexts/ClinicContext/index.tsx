import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ClinicContextType {
    inlineTag: string;
    onTopTag: string;
    setInlineTag: (tag: string) => void;
    setOnTopTag: (tag: string) => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const useClinicContext = (): ClinicContextType => {
    const context = useContext(ClinicContext);
    if (!context) {
        throw new Error('useClinicContext must be used within a ClinicProvider');
    }
    return context;
};

interface ClinicProviderProps {
    children: ReactNode;
}

export const ClinicProvider: React.FC<ClinicProviderProps> = ({ children }) => {
    const [inlineTag, setInlineTag] = useState<string>(() => {
        return localStorage.getItem('inlineTag') || 'Default Inline Tag';
    });

    const [onTopTag, setOnTopTag] = useState<string>(() => {
        return localStorage.getItem('onTopTag') || 'Default On Top Tag';
    });

    useEffect(() => {
        localStorage.setItem('inlineTag', inlineTag);
    }, [inlineTag]);

    useEffect(() => {
        localStorage.setItem('onTopTag', onTopTag);
    }, [onTopTag]);

    return (
        <ClinicContext.Provider value={{ inlineTag, onTopTag, setInlineTag, setOnTopTag }}>
            {children}
        </ClinicContext.Provider>
    );
};
