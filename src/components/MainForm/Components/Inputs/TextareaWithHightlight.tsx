import React, { useState, useCallback, useRef } from 'react';

type PropsType = {
    textareaProps: Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'onChange' | 'onScroll'>;
    textareaOnChange?: React.TextareaHTMLAttributes<HTMLTextAreaElement>['onChange'];
    textareaOnScroll?: React.TextareaHTMLAttributes<HTMLTextAreaElement>['onScroll'];
    textareaClassName?: string;
    hightlightArray: string[];
};

const TextareaWithHightlight: React.FC<PropsType> = props => {
    const { textareaProps, textareaClassName } = props;
    const { textareaOnScroll, textareaOnChange } = props;
    const { hightlightArray } = props;

    const [HighlightsText, setHighlightsText] = useState('');

    const HighlightsRef = useRef(document.createElement('div'));

    const handleOnChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (textareaOnChange) textareaOnChange(event);

            let highlightsText = event.currentTarget.value;

            hightlightArray.forEach(hightlightText => {
                highlightsText = highlightsText.replace(/\n$/g, '\n\n');
                highlightsText = highlightsText.replaceAll(`{{ ${hightlightText} }}`, `<mark>{{ ${hightlightText} }}</mark>`);
            });

            setHighlightsText(highlightsText);
        },
        [textareaOnChange, hightlightArray]
    );

    const handleOnScroll = useCallback(
        (event: React.UIEvent<HTMLTextAreaElement, UIEvent>) => {
            if (textareaOnScroll) textareaOnScroll(event);

            const scrollTop = event.currentTarget.scrollTop;

            HighlightsRef.current.scrollTop = scrollTop;
        },
        [textareaOnScroll]
    );

    return (
        <div className="mainForm__inputWithHightlight mainForm__inputWithHightlight--textarea">
            <div ref={HighlightsRef} className="mainForm__inputWithHightlight__highlights">
                <div className="mainForm__inputWithHightlight__highlights__textBox" dangerouslySetInnerHTML={{ __html: HighlightsText }} />
            </div>
            <textarea
                className={`mainForm__inputWithHightlight__input ${textareaClassName}`}
                onChange={handleOnChange}
                onScroll={handleOnScroll}
                {...textareaProps}
            />
        </div>
    );
};

export default TextareaWithHightlight;
