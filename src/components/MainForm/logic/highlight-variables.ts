import { useState, useCallback } from 'react';

const usehighlightVariables = (Variables: string[], replaceAllWrap = false): [string, (value: string) => void] => {
    const [TextAreaContent, setTextareaContentState] = useState('');

    const handleTextareaTextChange = useCallback(
        (value: string) => {
            let newContent = value;

            newContent = newContent.replaceAll('<mark>', '');
            newContent = newContent.replaceAll('</mark>', '');

            newContent = newContent.replace(/<font\sstyle=\\"color:\s(.*)\\">/gm, '');
            newContent = newContent.replace(/<font\sstyle=\"color:\s(.*)\">/gm, '');
            newContent = newContent.replaceAll('</font>', '');

            newContent = newContent.replace(/<span\sstyle=\\"color:\s(.*)\\">/gm, '');
            newContent = newContent.replace(/<span\sstyle=\"color:\s(.*)\">/gm, '');
            newContent = newContent.replaceAll('</span>', '');

            newContent = newContent.replaceAll('<div></div>', '');
            newContent = newContent.replaceAll('<div><br></div>', '<br>');

            if (replaceAllWrap) {
                newContent = newContent.replaceAll('<div>', '');
                newContent = newContent.replaceAll('</div>', '');
                newContent = newContent.replaceAll('<br>', '');
                newContent = newContent.replaceAll('\r', '');
                newContent = newContent.replaceAll('\n', '');
            }

            if (newContent.trim() === '<br>') {
                newContent = '';
            }

            Variables.forEach(Variable => {
                newContent = newContent.replaceAll(`{{ ${Variable} }}`, `<mark>{{ ${Variable} }}</mark>`);
            });

            setTextareaContentState(newContent);
        },
        [Variables, replaceAllWrap]
    );

    return [TextAreaContent, handleTextareaTextChange];
};

export default usehighlightVariables;
