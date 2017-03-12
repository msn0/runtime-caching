import React from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from './actions';
import Book from './book';

const Suggester = ({ phrase, books, dispatch }) => {

    function change(e) {
        dispatch(fetchBooks(e.target.value));
    }

    return (
        <div>
            <input onChange={ change } />
            <div>Phrase: { phrase }</div>
            {books.map(book =>
                <Book book={ book } key={ book.id } />
            )}
        </div>
    );
};

const mapStateToProps = ({ books = [], phrase }) => ({ books, phrase });

export default connect(mapStateToProps)(Suggester);
