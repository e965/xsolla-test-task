import React from 'react';

import MainForm from '../MainForm/Components/MainFormContainer';

import './App.scss';

const App: React.FC = () => {
    return (
        <div className="app">
            <header className="app__header">
                <h1>¯\_(ツ)_/¯</h1>
            </header>
            <main className="app__content">
                <div className="app__content__wrapper">
                    <MainForm />
                </div>
            </main>
        </div>
    );
};

export default App;
