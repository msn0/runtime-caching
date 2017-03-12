import { cache } from '../';

export const changePhrase = (phrase) => ({
    type: 'CHANGE_PHRASE',
    phrase
});

export const fetchBooksRequest = (phrase) => ({
    type: 'FETCH_BOOKS_REQUEST',
    phrase
});

export const fetchBooksSuccess = (phrase, json) => ({
    type: 'FETCH_BOOKS_SUCCESS',
    json,
    phrase
});

function getBooks(phrase) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${phrase}`)
      .then(response => response.json());
}

const getBooksCached = cache({ timeout: 60000 })(getBooks);

export function fetchBooks(phrase) {
    return function (dispatch) {
        if (phrase === '') {
            dispatch(fetchBooksSuccess(phrase, { items: [] }));
            return;
        }

        dispatch(fetchBooksRequest(phrase));
        getBooksCached(phrase).then(json => dispatch(fetchBooksSuccess(phrase, json)));
    };
}
