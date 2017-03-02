import React from 'react';
import { connect } from 'react-redux';
import { changePhrase } from './actions';

const Suggester = ({ phrase, dispatch }) => {

    function change(e) {
        dispatch(changePhrase(e.target.value));
    }

    return (
        <div>
            <input onChange={ change } value={ phrase } />
            <div>Phrase: { phrase }</div>
        </div>
    );
};

const mapStateToProps = ({ phrase }) => ({ phrase });

export default connect(mapStateToProps)(Suggester);
