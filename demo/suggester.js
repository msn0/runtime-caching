import React from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from './actions';
import Book from './book';
import ForkMeOnGithub from './fork-me-on-github';

const Suggester = ({ books, dispatch }) => {

    function change(e) {
        dispatch(fetchBooks(e.target.value));
    }

    function renderBook(book) {
        return <Book book={ book } key={ book.id } />;
    }

    return (
        <div className='wrapper'>
            <ForkMeOnGithub />
            <section className='suggester'>
                <header className='header'>
                  <h1 className='header-slogan'>Discover Google Books</h1>
                </header>
                <input className='search' onChange={ change } placeholder='enter a phrase' />
            </section>
            <section className='results'>
                { books.map(renderBook) }
            </section>
        </div>
    );
};

const mapStateToProps = ({ books = [] }) => ({ books });

export default connect(mapStateToProps)(Suggester);
