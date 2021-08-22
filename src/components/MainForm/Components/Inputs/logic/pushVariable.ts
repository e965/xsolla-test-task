type InputInteractionsObjectType = {
    setValue: (value: string) => void;
    getValue: () => string;
    focus: () => void;
    getCursorPosition: () => number;
    setCursorPosition: (position: number) => void;
    dispatchEvent: (event: Event) => void;
};

const pushVariableToField = (variableText: string, inputInteractions: InputInteractionsObjectType): void => {
    const ChangeEvent = document.createEvent('HTMLEvents');
    ChangeEvent.initEvent('change', false, true);

    const createNewValue = (value: string, cursorPosition: number, variableText: string) => {
        const ValueBeforeCursor = value.substring(0, cursorPosition);
        const ValueAfterCursor = value.substring(cursorPosition, value.length);

        return ValueBeforeCursor + `{{ ${variableText} }}` + ValueAfterCursor;
    };

    const VariableLength = variableText.length + '{{  }}'.length;

    const CursorPosition = inputInteractions.getCursorPosition();
    const NeWCursorPosition = CursorPosition + VariableLength;

    inputInteractions.focus();

    inputInteractions.setValue(createNewValue(inputInteractions.getValue(), CursorPosition, variableText));
    inputInteractions.setCursorPosition(NeWCursorPosition);

    inputInteractions.dispatchEvent(ChangeEvent);
};

export default pushVariableToField;
