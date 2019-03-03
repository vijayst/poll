export default function pollReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_QUESTION':
        case 'CHANGE_OPTION1':
        case 'CHANGE_OPTION2':
        case 'SET_ERROR':
            return {
                ...state,
                ...action.payload
            };
        case 'ADD_OPTION': {
            let { options } = state;
            options = options.slice();
            options.push('');
            return {
                ...state,
                options
            };
        }
        case 'CHANGE_OPTION': {
            const { optionIndex, option } = action.payload;
            let { options } = state;
            options = options.slice();
            options[optionIndex] = option;
            return {
                ...state,
                options
            };
        }
        default:
            return state;
    }
}
