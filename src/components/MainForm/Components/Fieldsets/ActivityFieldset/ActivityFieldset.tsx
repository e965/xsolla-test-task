import React from 'react';

import type { MainFormReduxState } from '../../../MainFormTypes';
import type { ActivityType } from '../../../MainFormTypes';

import LetterFormItems from './FormItems/LetterFormItems';
import ChatMessageFormItems from './FormItems/ChatMessageFormItems';
import TicketFormItems from './FormItems/TicketFormItems';

type PropsType = Pick<MainFormReduxState, 'Variables'> & {
    VariablesKeys: string[];
    SelectedActivityType: ActivityType;
    selectedActivityTypeChange: (activityType: ActivityType) => void;
};

const DataFieldset: React.FC<PropsType> = props => {
    const { Variables, VariablesKeys } = props;
    const { SelectedActivityType, selectedActivityTypeChange } = props;

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
                                    <button className="mainForm__variables__button">{entry[0]}</button>
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
