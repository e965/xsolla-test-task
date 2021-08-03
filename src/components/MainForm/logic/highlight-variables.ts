import { useState, useCallback } from 'react';

const usehighlightVariables = (Variables: string[]): [string, (value: string) => void] => {
    const [TextAreaContent, setTextareaContentState] = useState('');

    const handleTextareaTextChange = useCallback(
        (value: string) => {
            let newContent = value;

            newContent = newContent.replaceAll('<mark>', '');
            newContent = newContent.replaceAll('</mark>', '');

            newContent = newContent.replaceAll('<div></div>', '');
            newContent = newContent.replaceAll('<div><br></div>', '<br>');

            if (newContent.trim() === '<br>') {
                newContent = '';
            }

            Variables.forEach(Variable => {
                newContent = newContent.replaceAll(`{{ ${Variable} }}`, `<mark>{{ ${Variable} }}</mark>`);
            });

            setTextareaContentState(newContent);
        },
        [Variables]
    );

    return [TextAreaContent, handleTextareaTextChange];
};

export default usehighlightVariables;
