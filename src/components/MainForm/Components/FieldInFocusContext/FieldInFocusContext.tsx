import React, { createContext } from 'react';
import { useState, useCallback } from 'react';

type InputInFocusRefType = React.MutableRefObject<HTMLInputElement> | undefined;

type TextareaInFocusRefType = React.MutableRefObject<HTMLTextAreaElement> | undefined;

type ContextType = [
    CurrentInputInFocus: InputInFocusRefType,
    setCurrentInputInFocus: (ref: InputInFocusRefType) => void,
    CurrentTextareaInFocus: TextareaInFocusRefType,
    setCurrentTextareaInFocus: (ref: TextareaInFocusRefType) => void
];

export const FieldInFocusContext = createContext<ContextType>([
    void 0,
    () => void 0,
    //
    void 0,
    () => void 0,
]);

export const FieldInFocusProvider: React.FC = ({ children }) => {
    const [InputInFocus, setInputInFocus] = useState<InputInFocusRefType>();
    const [TextareaInFocus, setTextareaInFocus] = useState<TextareaInFocusRefType>();

    const setInputInFocusState = useCallback((ref: InputInFocusRefType) => {
        setInputInFocus(ref);
        setTextareaInFocus(void 0);
    }, []);

    const setTextareaInFocusState = useCallback((ref: TextareaInFocusRefType) => {
        setTextareaInFocus(ref);
        setInputInFocus(void 0);
    }, []);

    return (
        <FieldInFocusContext.Provider value={[InputInFocus, setInputInFocusState, TextareaInFocus, setTextareaInFocusState]}>
            {children}
        </FieldInFocusContext.Provider>
    );
};
