import React, { useCallback } from 'react';
import Timezones from 'timezones-list';

import './MainForm.scss';

const MainForm: React.FC = () => {
    const formSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }, []);

    return (
        <form className="mainForm" onSubmit={formSubmitHandler}>
            <fieldset className="mainForm__fieldset">
                <div className="mainForm__fieldset__legend">Data</div>
                <div className="mainForm__fieldset__inputs">
                    <div className="mainForm__formItem">
                        <label className="mainForm__formItem__label" htmlFor="dwh_link">
                            DWH Link
                        </label>
                        <input className="mainForm__formItem__input" id="dwh_link" type="url" />
                    </div>
                </div>
                <div className="mainForm__fieldset__extra" />
            </fieldset>

            <hr className="mainForm__separator" />

            <fieldset className="mainForm__fieldset">
                <div className="mainForm__fieldset__legend">Trigger</div>
                <div className="mainForm__fieldset__inputs mainForm__fieldset__inputs--two">
                    <div className="mainForm__formItem">
                        <label className="mainForm__formItem__label" htmlFor="cron_exp">
                            CRON expression
                        </label>
                        <input className="mainForm__formItem__input" id="cron_exp" type="text" />
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
                <div className="mainForm__fieldset__extra" />
            </fieldset>
        </form>
    );
};

export default MainForm;
