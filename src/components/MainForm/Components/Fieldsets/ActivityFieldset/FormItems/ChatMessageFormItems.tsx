import React from 'react';
import ContentEditable from 'react-contenteditable';

import type { MainFormReduxState } from '../../../../MainFormTypes';

import usehighlightVariables from '../../../../logic/highlight-variables';

type PropsType = Pick<MainFormReduxState, 'Variables'> & {
    //
};

const ChatMessageFormItems: React.FC<PropsType> = props => {
    const { Variables } = props;

    const [Text, setText] = usehighlightVariables(Object.keys(Variables ?? {}));

    return (
        <>
            <div className="mainForm__formItem">
                <label className="mainForm__formItem__label" htmlFor="letter_from">
                    Webhook URL
                </label>
                <input className="mainForm__formItem__input" id="letter_from" type="url" />
            </div>
            <div className="mainForm__formItem">
                <label className="mainForm__formItem__label" htmlFor="letter_text">
                    Text
                </label>
                <ContentEditable
                    className="mainForm__formItem__input mainForm__formItem__input--textarea"
                    html={Text}
                    role="textbox"
                    aria-labelledby="letter_text"
                    onChange={event => setText(event.target.value)}
                />
            </div>
        </>
    );
};

export default ChatMessageFormItems;
