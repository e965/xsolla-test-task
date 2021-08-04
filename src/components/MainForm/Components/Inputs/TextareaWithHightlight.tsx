import React, { useState, useCallback, useRef, useContext, useEffect } from 'react';

import { FieldInFocusContext } from '../FieldInFocusContext/FieldInFocusContext';

type PropsType = {
    textareaProps: Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'onChange' | 'onScroll'>;
    textareaOnChange?: React.TextareaHTMLAttributes<HTMLTextAreaElement>['onChange'];
    textareaOnScroll?: React.TextareaHTMLAttributes<HTMLTextAreaElement>['onScroll'];
    textareaOnFocus?: React.TextareaHTMLAttributes<HTMLTextAreaElement>['onFocus'];
    textareaClassName?: string;
    hightlightArray: string[];
};

const TextareaWithHightlight: React.FC<PropsType> = props => {
    const { textareaProps, textareaClassName } = props;
    const { textareaOnScroll, textareaOnChange, textareaOnFocus } = props;
    const { hightlightArray } = props;

    const [HighlightsText, setHighlightsText] = useState('');

    const [, , CurrentTextAreaInFocus, setCurrentTextAreaInFocus] = useContext(FieldInFocusContext);

    const [IsThisFieldInFocus, setIsThisFieldInFocus] = useState<boolean>(false);

    const TextareaRef = useRef(document.createElement('textarea'));

    const HighlightsRef = useRef(document.createElement('div'));

    useEffect(() => {
        setIsThisFieldInFocus(CurrentTextAreaInFocus?.current?.id === TextareaRef?.current?.id);
    }, [CurrentTextAreaInFocus]);

    useEffect(() => {
        return () => {
            setCurrentTextAreaInFocus(void 0);
        };
    }, []);

    useEffect(() => {
        const changeEvent = (event: Event) => {
            const _target = event.target as HTMLTextAreaElement;
            highlightValue(_target.value);
        };

        if (IsThisFieldInFocus) {
            TextareaRef.current.addEventListener('change', changeEvent);
        } else {
            TextareaRef.current.removeEventListener('change', changeEvent);
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
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (textareaOnChange) textareaOnChange(event);

            highlightValue(event.target.value);
        },
        [textareaOnChange, highlightValue]
    );

    const handleOnScroll = useCallback(
        (event: React.UIEvent<HTMLTextAreaElement, UIEvent>) => {
            if (textareaOnScroll) textareaOnScroll(event);

            const scrollTop = event.currentTarget.scrollTop;

            HighlightsRef.current.scrollTop = scrollTop;
        },
        [textareaOnScroll]
    );

    const handleOnFocus = useCallback(
        (event: React.FocusEvent<HTMLTextAreaElement>) => {
            if (textareaOnFocus) textareaOnFocus(event);

            setCurrentTextAreaInFocus(TextareaRef);
        },
        [textareaOnFocus, setCurrentTextAreaInFocus]
    );

    return (
        <div className="mainForm__inputWithHightlight mainForm__inputWithHightlight--textarea">
            <div ref={HighlightsRef} className="mainForm__inputWithHightlight__highlights">
                <div className="mainForm__inputWithHightlight__highlights__textBox" dangerouslySetInnerHTML={{ __html: HighlightsText }} />
            </div>
            <textarea
                ref={TextareaRef}
                className={`mainForm__inputWithHightlight__input ${textareaClassName}`}
                onChange={handleOnChange}
                onScroll={handleOnScroll}
                onFocus={handleOnFocus}
                {...textareaProps}
            />
        </div>
    );
};

export default TextareaWithHightlight;
