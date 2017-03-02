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

export function fetchBooks(phrase) {
    return function (dispatch) {
        dispatch(fetchBooksRequest(phrase));
        return fetch(`https://www.googleapis.com/books/v1/volumes?q=${phrase}`)
            .then(response => response.json())
            .then(json => dispatch(fetchBooksSuccess(phrase, json)));
    };
}
