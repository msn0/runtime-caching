import { cache } from '../';

export const fetchBooksSuccess = (books) => ({
    type: 'FETCH_BOOKS_SUCCESS',
    books
});

function getBooks(phrase) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${phrase}`)
        .then(response => response.json());
}

const getBooksCached = cache({ timeout: 60000 })(getBooks);

export function fetchBooks(phrase) {
    return function (dispatch) {
        if (phrase === '') {
            dispatch(fetchBooksSuccess([]));
            return;
        }

        getBooksCached(phrase)
            .then(json => dispatch(fetchBooksSuccess(json.items)));
    };
}
