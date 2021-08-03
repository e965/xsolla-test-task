import React from 'react';
import Timezones from 'timezones-list';

type PropsType = {
    //
};

const TriggerFieldset: React.FC<PropsType> = props => {
    return (
        <fieldset className="mainForm__fieldset">
            <div className="mainForm__fieldset__legend">Trigger</div>
            <div className="mainForm__fieldset__inputs mainForm__fieldset__inputs--two">
                <div className="mainForm__formItem mainForm__formItem__noTopMargin">
                    <label className="mainForm__formItem__label" htmlFor="cron_exp">
                        CRON expression
                    </label>
                    <input className="mainForm__formItem__input" id="cron_exp" type="text" placeholder="* * * * *" />
                </div>
                <div className="mainForm__formItem mainForm__formItem__noTopMargin">
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
    );
};

export default TriggerFieldset;
