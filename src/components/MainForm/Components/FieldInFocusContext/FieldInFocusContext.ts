import { createContext } from 'react';

export type InputInteractionsObjectType = {
    getCurrentID: () => string;
    pushVariable: (variableText: string) => void;
};

export type ContextType = [
    InputInteractions: InputInteractionsObjectType | undefined,
    setInputInteractions: (inputInteractions: InputInteractionsObjectType | undefined) => void
];

const FieldInFocusContext = createContext<ContextType>([void 0, () => void 0]);

export default FieldInFocusContext;
