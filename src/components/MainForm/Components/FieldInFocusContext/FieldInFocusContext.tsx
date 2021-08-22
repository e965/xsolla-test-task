import React, { createContext } from 'react';

type InputInteractionsObjectType = {
    getCurrentID: () => string;
    pushVariable: (variableText: string) => void;
};

type ContextType = [
    InputInteractions: InputInteractionsObjectType | undefined,
    setInputInteractions: (inputInteractions: InputInteractionsObjectType | undefined) => void
];

export const FieldInFocusContext = createContext<ContextType>([void 0, () => void 0]);

export const FieldInFocusProvider: React.FC = ({ children }) => {
    return <FieldInFocusContext.Provider value={[undefined, () => void 0]}>{children}</FieldInFocusContext.Provider>;
};
