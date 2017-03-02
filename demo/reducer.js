export default (state = '', action) => {
    console.log({ action, state });
    switch (action.type) {
        case 'CHANGE_PHRASE':
            return { phrase: action.phrase };
        default:
            return state;
    };
};
