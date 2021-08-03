import React from 'react';

import type { MainFormReduxState } from '../../../MainFormTypes';

type PropsType = Pick<MainFormReduxState, 'Variables'> & {
    //
};

const DataFieldset: React.FC<PropsType> = props => {
    const { Variables } = props;

    return (
        <fieldset className="mainForm__fieldset">
            <div className="mainForm__fieldset__legend">Activity</div>
            <div className="mainForm__fieldset__inputs">
                <div className="mainForm__formItem">
                    <label className="mainForm__formItem__label" htmlFor="timezone">
                        Type
                    </label>
                    <select className="mainForm__formItem__input" id="timezone" defaultValue="none">
                        <option disabled hidden value="none" />
                        <option value="letter">Letter</option>
                        <option value="chat_message">Chart Message</option>
                        <option value="ticket">Ticket</option>
                    </select>
                </div>
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
