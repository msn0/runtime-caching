import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';
import Suggester from './suggester';

const store = createStore(reducer);

render(
    <Provider store={ store }>
        <section>
            <header>
                <h1></h1>
            </header>
            <Suggester />
        </section>
    </Provider>,
    document.getElementById('root')
);
