export default (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_PHRASE':
            return { phrase: action.phrase };
        case 'FETCH_BOOKS_REQUEST':
            return {
                phrase: action.phrase,
                books: state.books
            };
        case 'FETCH_BOOKS_SUCCESS':
            return {
                books: action.json.items,
                phrase: action.phrase
            };
        default:
            return state;
    };
};
