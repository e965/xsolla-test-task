import React, { useState, useCallback } from 'react';

type PropsType = {
    inputProps: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'onChange'>;
    inputOnChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
    inputClassName?: string;
    hightlightArray: string[];
};

const TextInputWithHightlight: React.FC<PropsType> = props => {
    const { inputProps, inputClassName } = props;
    const { inputOnChange } = props;
    const { hightlightArray } = props;

    const [HighlightsText, setHighlightsText] = useState('');

    const handleOnChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (inputOnChange) inputOnChange(event);

            let highlightsText = event.currentTarget.value;

            hightlightArray.forEach(hightlightText => {
                highlightsText = highlightsText.replace(/\n$/g, '\n\n');
                highlightsText = highlightsText.replaceAll(`{{ ${hightlightText} }}`, `<mark>{{ ${hightlightText} }}</mark>`);
            });

            setHighlightsText(highlightsText);
        },
        [inputOnChange, hightlightArray]
    );

    return (
        <div className="mainForm__inputWithHightlight mainForm__inputWithHightlight--textInput">
            <div className="mainForm__inputWithHightlight__highlights">
                <div className="mainForm__inputWithHightlight__highlights__textBox" dangerouslySetInnerHTML={{ __html: HighlightsText }} />
            </div>
            <input
                className={`mainForm__inputWithHightlight__input ${inputClassName}`}
                onChange={handleOnChange}
                onScroll={event => console.log(event.currentTarget.scrollWidth)}
                {...inputProps}
            />
        </div>
    );
};

export default TextInputWithHightlight;
