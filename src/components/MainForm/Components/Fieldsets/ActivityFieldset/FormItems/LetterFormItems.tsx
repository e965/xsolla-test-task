import React, { useState } from 'react';

const LetterFormItems: React.FC = () => {
    // const [text, setText] = useState('');

    // const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     console.log(event.target.value);

    //     const ddd = event.target.value.replaceAll('asd', '<s>123</s>');

    //     setText(ddd);
    // };

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
                <textarea
                    className="mainForm__formItem__input mainForm__formItem__input--textarea"
                    id="letter_text"
                    // value={text}
                    // onChange={handleTextChange}
                />
            </div>
        </>
    );
};

export default LetterFormItems;
