import React from 'react';
import { render } from 'react-dom';
import Suggester from './suggester';

render(
    <section>
        <header>
            <h1>Google Books</h1>
        </header>
        <Suggester />
    </section>,
    document.getElementById('root')
);
