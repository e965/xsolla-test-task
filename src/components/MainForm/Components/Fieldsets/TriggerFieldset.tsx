import React, { useCallback } from 'react';
import Timezones from 'timezones-list';

type PropsType = {
    IsTriggerUnlocked: boolean;
    handleTriggerFieldsSetted: () => void;
};

const TriggerFieldset: React.FC<PropsType> = props => {
    const { IsTriggerUnlocked } = props;
    const { handleTriggerFieldsSetted } = props;

    const handleCronExpressionChange = useCallback(() => {
        handleTriggerFieldsSetted();
    }, []);

    return (
        <fieldset className="mainForm__fieldset">
            <div className="mainForm__fieldset__legend">Trigger</div>
            <div className="mainForm__fieldset__inputs mainForm__fieldset__inputs--two">
                <div className="mainForm__formItem mainForm__formItem__noTopMargin">
                    <label className="mainForm__formItem__label" htmlFor="cron_exp">
                        CRON expression
                    </label>
                    <input
                        className="mainForm__formItem__input"
                        id="cron_exp"
                        name="cron_exp"
                        type="text"
                        placeholder="0 */15 * ? * *"
                        disabled={!IsTriggerUnlocked}
                        onChange={handleCronExpressionChange}
                        required
                    />
                </div>
                <div className="mainForm__formItem mainForm__formItem__noTopMargin">
                    <label className="mainForm__formItem__label" htmlFor="timezone">
                        Time zone
                    </label>
                    <select className="mainForm__formItem__input" id="timezone" name="timezone" disabled={!IsTriggerUnlocked} required>
                        {Timezones.map(timeZone => (
                            <option key={timeZone.tzCode} value={timeZone.tzCode}>
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
