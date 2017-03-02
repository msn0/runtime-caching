import React from 'react';
import { connect } from 'react-redux';
import { changePhrase } from './actions';

const Suggester = (state) => {

    console.log('sss', state);

    function change() {
        console.log('change');
        state.dispatch(changePhrase('test phrase'));
    }

    return (
        <div>
            <button onClick={ change }>
                click me
            </button>
            <div>Phrase: { state.phrase }</div>
        </div>
    );
};

const mapStateToProps = ({ phrase }) => ({ phrase });

export default connect(mapStateToProps)(Suggester);
