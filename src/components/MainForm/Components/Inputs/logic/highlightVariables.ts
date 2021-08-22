import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

type NewFieldValueSetterFunctionType = (newValue: string) => void;

const highlightVariablesInField = (currentValue: string, hightlightArray: string[], newFieldValueSetter: NewFieldValueSetterFunctionType): void => {
    let newValue = currentValue;

    hightlightArray.forEach(hightlightText => {
        newValue = newValue.replace(/\n$/g, '\n\n');

        // since we are using dangerouslySetInnerHTML, we must provide at least some security
        // but we can't use JSX here :(

        newValue = newValue.replaceAll(`{{ ${hightlightText} }}`, renderToString(createElement('mark', null, `{{ ${hightlightText} }}`)));
    });

    newFieldValueSetter(newValue);
};

export default highlightVariablesInField;
