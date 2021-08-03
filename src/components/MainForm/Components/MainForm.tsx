import React, { useCallback } from 'react';

import Timezones from 'timezones-list';

import type { MainFormReduxState } from '../MainFormTypes';

import DataFieldset from './Fieldsets/DataFieldset';

import './MainForm.scss';

type PropsType = Pick<MainFormReduxState, 'Variables'> & {
    handleDataPost: (dwhLink: string) => void;
};

const MainForm: React.FC<PropsType> = props => {
    const { Variables } = props;
    const { handleDataPost } = props;

    const formSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }, []);

    return (
        <form className="mainForm" onSubmit={formSubmitHandler}>
            <DataFieldset {...{ handleDataPost }} />

            <hr className="mainForm__separator" />

            <fieldset className="mainForm__fieldset">
                <div className="mainForm__fieldset__legend">Trigger</div>
                <div className="mainForm__fieldset__inputs mainForm__fieldset__inputs--two">
                    <div className="mainForm__formItem">
                        <label className="mainForm__formItem__label" htmlFor="cron_exp">
                            CRON expression
                        </label>
                        <input className="mainForm__formItem__input" id="cron_exp" type="text" placeholder="* * * * *" />
                    </div>
                    <div className="mainForm__formItem">
                        <label className="mainForm__formItem__label" htmlFor="timezone">
                            Time zone
                        </label>
                        <select className="mainForm__formItem__input" id="timezone" defaultValue="none">
                            <option disabled hidden value="none" />
                            {Timezones.map(timeZone => (
                                <option key={timeZone.tzCode} value={timeZone.utc}>
                                    {timeZone.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mainForm__fieldset__extra" />
            </fieldset>

            <hr className="mainForm__separator" />

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
        </form>
    );
};

export default MainForm;
