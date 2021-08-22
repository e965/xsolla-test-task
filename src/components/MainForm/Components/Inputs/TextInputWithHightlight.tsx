import React, { useState, useCallback, useRef, useContext, useEffect } from 'react';

import pushVariableToField from './logic/pushVariable';
import highlightVariablesInField from './logic/highlightVariables';

import { FieldInFocusContext } from '../FieldInFocusContext/FieldInFocusContext';

type PropsType = {
    inputProps: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'onChange'> & React.ClassAttributes<HTMLInputElement>;
    inputOnChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
    inputOnFocus?: React.TextareaHTMLAttributes<HTMLInputElement>['onFocus'];
    inputClassName?: string;
    hightlightArray: string[];
};

const TextInputWithHightlight: React.FC<PropsType> = props => {
    const { inputProps, inputClassName } = props;
    const { inputOnChange, inputOnFocus } = props;
    const { hightlightArray } = props;

    const [HighlightsText, setHighlightsText] = useState('');

    const [InputInteractions, setInputInteractions] = useContext(FieldInFocusContext);

    const [IsThisFieldInFocus, setIsThisFieldInFocus] = useState<boolean>(false);

    const InputRef = useRef(document.createElement('input'));

    useEffect(() => {
        setIsThisFieldInFocus(InputInteractions?.getCurrentID() === InputRef.current?.id);
    }, [InputInteractions]);

    useEffect(() => {
        return () => {
            setInputInteractions(void 0);
        };
    }, []);

    useEffect(() => {
        const changeEvent = (event: Event) => {
            const _target = event.target as HTMLInputElement;
            highlightValue(_target.value);
        };

        if (IsThisFieldInFocus) {
            InputRef.current.addEventListener('change', changeEvent);
        } else {
            InputRef.current.removeEventListener('change', changeEvent);
        }
    }, [IsThisFieldInFocus]);

    const highlightValue = useCallback(
        (currentValue: string) => {
            return highlightVariablesInField(currentValue, hightlightArray, setHighlightsText);
        },
        [hightlightArray]
    );

    const handleOnChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (inputOnChange) inputOnChange(event);

            highlightValue(event.target.value);
        },
        [inputOnChange, highlightValue]
    );

    const handleOnFocus = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            if (inputOnFocus) inputOnFocus(event);

            setInputInteractions({
                getCurrentID: () => InputRef.current?.id,
                pushVariable: variableText =>
                    pushVariableToField(variableText, {
                        setValue: (value: string) => (InputRef.current.value = value),
                        getValue: () => InputRef.current.value,
                        focus: () => InputRef.current.focus(),
                        getCursorPosition: () => InputRef.current.selectionEnd ?? 0,
                        setCursorPosition: (position: number) => InputRef.current.setSelectionRange(position, position),
                        dispatchEvent: (event: Event) => InputRef.current.dispatchEvent(event),
                    }),
            });
        },
        [inputOnFocus, setInputInteractions]
    );

    return (
        <div className="mainForm__inputWithHightlight mainForm__inputWithHightlight--textInput">
            <div className="mainForm__inputWithHightlight__highlights">
                <div className="mainForm__inputWithHightlight__highlights__textBox" dangerouslySetInnerHTML={{ __html: HighlightsText }} />
            </div>
            <input
                ref={InputRef}
                className={`mainForm__inputWithHightlight__input ${inputClassName}`}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                {...inputProps}
            />
        </div>
    );
};

export default TextInputWithHightlight;
