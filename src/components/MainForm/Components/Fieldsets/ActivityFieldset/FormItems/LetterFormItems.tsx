import React from 'react';
import ContentEditable from 'react-contenteditable';

import type { MainFormReduxState } from '../../../../MainFormTypes';

import usehighlightVariables from '../../../../logic/highlight-variables';

type PropsType = Pick<MainFormReduxState, 'Variables'> & {
    //
};

const LetterFormItems: React.FC<PropsType> = props => {
    const { Variables } = props;

    const [text, setText] = usehighlightVariables(Object.keys(Variables ?? {}));

    return (
        <>
            <div className="mainForm__formItem">
                <label className="mainForm__formItem__label" htmlFor="letter_from">
                    From
                </label>
                <input className="mainForm__formItem__input" id="letter_from" type="text" />
            </div>
            <div className="mainForm__formItem">
                <label className="mainForm__formItem__label" htmlFor="letter_to">
                    To
                </label>
                <input className="mainForm__formItem__input" id="letter_to" type="text" />
            </div>
            <div className="mainForm__formItem">
                <label className="mainForm__formItem__label" htmlFor="letter_subject">
                    Subject
                </label>
                <input className="mainForm__formItem__input" id="letter_subject" type="text" />
            </div>
            <div className="mainForm__formItem">
                <label className="mainForm__formItem__label" htmlFor="letter_text">
                    Text
                </label>
                <ContentEditable
                    className="mainForm__formItem__input mainForm__formItem__input--textarea"
                    html={text}
                    role="textbox"
                    aria-labelledby="letter_text"
                    onChange={event => setText(event.target.value)}
                />
            </div>
        </>
    );
};

export default LetterFormItems;
