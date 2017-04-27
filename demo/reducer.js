export default (state = '', { type, books }) => {
    switch (type) {
        case 'FETCH_BOOKS_SUCCESS':
            return { books };
        default:
            return state;
    };
};
