export default (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_PHRASE':
            return { phrase: action.phrase };
        case 'FETCH_BOOKS_REQUEST':
            console.log('FETCH_BOOKS_REQUEST', state, action);
            return { phrase: action.phrase };
        case 'FETCH_BOOKS_SUCCESS':
            console.log('FETCH_BOOKS_SUCCESS', state, action);
            return {
                books: action.json.items,
                phrase: action.phrase
            };
        default:
            return state;
    };
};
