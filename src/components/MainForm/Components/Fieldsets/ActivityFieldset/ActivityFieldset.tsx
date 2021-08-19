import React, { useCallback, useContext, useMemo } from 'react';

import type { MainFormReduxState } from '../../../MainFormTypes';
import type { ActivityType } from '../../../MainFormTypes';

import { FieldInFocusContext } from '../../FieldInFocusContext/FieldInFocusContext';

import LetterFormItems from './FormItems/LetterFormItems';
import ChatMessageFormItems from './FormItems/ChatMessageFormItems';
import TicketFormItems from './FormItems/TicketFormItems';

type PropsType = Pick<MainFormReduxState, 'Variables'> & {
    VariablesKeys: string[];
    IsActivityUnlocked: boolean;
    SelectedActivityType: ActivityType;
    selectedActivityTypeChange: (activityType: ActivityType) => void;
};

const DataFieldset: React.FC<PropsType> = props => {
    const { Variables, VariablesKeys } = props;
    const { IsActivityUnlocked } = props;
    const { SelectedActivityType, selectedActivityTypeChange } = props;

    const [InputInFocus, , TextareaInFocus] = useContext(FieldInFocusContext);

    const handleAddVariableToField = useCallback(
        (variableText: string) => {
            const evt = document.createEvent('HTMLEvents');
            evt.initEvent('change', false, true);

            const createNewValue = (value: string, cursorPosition: number, variableText: string) => {
                const ValueBeforeCursor = value.substring(0, cursorPosition);
                const ValueAfterCursor = value.substring(cursorPosition, value.length);

                return ValueBeforeCursor + `{{ ${variableText} }}` + ValueAfterCursor;
            };

            const VariableLength = variableText.length + '{{  }}'.length;

            if (InputInFocus) {
                const Input = InputInFocus.current;
                const CursorPosition = Number(Input.selectionEnd);
                const NeWCursorPosition = CursorPosition + VariableLength;

                InputInFocus.current.focus();
                InputInFocus.current.value = createNewValue(Input.value, CursorPosition, variableText);
                InputInFocus.current.setSelectionRange(NeWCursorPosition, NeWCursorPosition);

                InputInFocus.current.dispatchEvent(evt);
            }

            if (TextareaInFocus) {
                const Input = TextareaInFocus.current;
                const CursorPosition = Number(Input.selectionEnd);
                const NeWCursorPosition = CursorPosition + VariableLength;

                TextareaInFocus.current.focus();
                TextareaInFocus.current.value = createNewValue(Input.value, CursorPosition, variableText);
                TextareaInFocus.current.setSelectionRange(NeWCursorPosition, NeWCursorPosition);

                TextareaInFocus.current.dispatchEvent(evt);
            }
        },
        [InputInFocus, TextareaInFocus]
    );

    const IsAnyFieldInFocus = useMemo((): boolean => {
        return !!InputInFocus || !!TextareaInFocus;
    }, [InputInFocus, TextareaInFocus]);

    return (
        <fieldset className="mainForm__fieldset">
            <div className="mainForm__fieldset__legend">Activity</div>
            <div className="mainForm__fieldset__inputs">
                <div className="mainForm__formItem">
                    <label className="mainForm__formItem__label" htmlFor="activity_type">
                        Type
                    </label>
                    <select
                        className="mainForm__formItem__input"
                        id="activity_type"
                        name="activity_type"
                        value={SelectedActivityType}
                        onChange={event => selectedActivityTypeChange(event.currentTarget.value as ActivityType)}
                        disabled={!IsActivityUnlocked}
                        required>
                        <option disabled hidden value="none" />
                        <option value="letter">Letter</option>
                        <option value="chat_message">Chat Message</option>
                        <option value="ticket">Ticket</option>
                    </select>
                </div>

                {SelectedActivityType === 'letter' ? <LetterFormItems {...{ VariablesKeys }} /> : null}
                {SelectedActivityType === 'chat_message' ? <ChatMessageFormItems {...{ VariablesKeys }} /> : null}
                {SelectedActivityType === 'ticket' ? <TicketFormItems {...{ VariablesKeys }} /> : null}
            </div>
            <section className="mainForm__fieldset__extra mainForm__variables">
                {Variables ? (
                    <>
                        <h4 className="mainForm__variables__title">Variables</h4>
                        <ul className="mainForm__variables__list">
                            {Object.entries(Variables).map(entry => (
                                <li key={entry[0]} className="mainForm__variables__listItem">
                                    <button
                                        type="button"
                                        className="mainForm__variables__button"
                                        onClick={event => {
                                            event.preventDefault();
                                            handleAddVariableToField(entry[0]);
                                        }}
                                        disabled={!IsAnyFieldInFocus}>
                                        {entry[0]}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : null}
            </section>
        </fieldset>
    );
};

export default DataFieldset;
