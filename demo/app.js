import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import Suggester from './suggester';
import ForkMeOnGithub from './fork-me-on-github';

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
);

render(
    <Provider store={ store }>
        <Suggester />
    </Provider>,
    document.getElementById('root')
);
