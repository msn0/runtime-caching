import React from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from './actions';
import Book from './book';

const Suggester = ({ phrase, books, dispatch }) => {

    function change(e) {
        dispatch(fetchBooks(e.target.value));
    }

    function renderBook(book) {
        return <Book book={ book } key={ book.id } />;
    }

    return (
        <div className='wrapper'>
            <section className='suggester'>
                <input onChange={ change } />
                <div>Phrase: { phrase }</div>
            </section>
            <section className='results'>
                { books.map(renderBook) }
            </section>
        </div>
    );
};

const mapStateToProps = ({ books = [], phrase }) => ({ books, phrase });

export default connect(mapStateToProps)(Suggester);
