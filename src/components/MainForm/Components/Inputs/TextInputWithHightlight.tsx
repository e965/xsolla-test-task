import React, { useState, useCallback, useRef, useContext, useEffect } from 'react';

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

    const [CurrentInputInFocus, setCurrentInputInFocus] = useContext(FieldInFocusContext);

    const [IsThisFieldInFocus, setIsThisFieldInFocus] = useState<boolean>(false);

    const InputRef = useRef(document.createElement('input'));

    useEffect(() => {
        setIsThisFieldInFocus(CurrentInputInFocus?.current?.id === InputRef?.current?.id);
    }, [CurrentInputInFocus]);

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
        (value: string) => {
            let newValue = value;

            hightlightArray.forEach(hightlightText => {
                newValue = newValue.replace(/\n$/g, '\n\n');
                newValue = newValue.replaceAll(`{{ ${hightlightText} }}`, `<mark>{{ ${hightlightText} }}</mark>`);
            });

            setHighlightsText(newValue);
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

            setCurrentInputInFocus(InputRef);
        },
        [inputOnFocus, setCurrentInputInFocus]
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
