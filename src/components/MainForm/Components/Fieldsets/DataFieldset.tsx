import React from 'react';
import { useDebounceCallback } from '@react-hook/debounce';

type PropsType = {
    handleDataPost: (dwhLink: string) => void;
};

const DataFieldset: React.FC<PropsType> = props => {
    const { handleDataPost } = props;

    const handleDataPostCallback = useDebounceCallback((event: React.FormEvent<HTMLInputElement>) => {
        const _target = event.target as HTMLInputElement;
        if (_target.value && _target.checkValidity()) {
            handleDataPost(_target.value);
        } else {
            _target.reportValidity();
        }
    }, 250);

    return (
        <fieldset className="mainForm__fieldset">
            <div className="mainForm__fieldset__legend">Data</div>
            <div className="mainForm__fieldset__inputs">
                <div className="mainForm__formItem">
                    <label className="mainForm__formItem__label" htmlFor="dwh_link">
                        DWH Link
                    </label>
                    <input
                        className="mainForm__formItem__input"
                        id="dwh_link"
                        name="dwh_link"
                        type="url"
                        onInput={handleDataPostCallback}
                        placeholder="https://service.xsolla.com"
                        required
                    />
                </div>
            </div>
            <div className="mainForm__fieldset__extra" />
        </fieldset>
    );
};

export default DataFieldset;
