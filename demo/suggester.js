import React from 'react';
import { connect } from 'react-redux';
import { changePhrase, fetchBooks } from './actions';

const Suggester = ({ phrase, dispatch }) => {

    function change(e) {
        dispatch(fetchBooks(e.target.value));
    }

    return (
        <div>
            <input onChange={ change } />
            <div>Phrase: { phrase }</div>
        </div>
    );
};

const mapStateToProps = ({ books, phrase }) => ({ books, phrase });

export default connect(mapStateToProps)(Suggester);
