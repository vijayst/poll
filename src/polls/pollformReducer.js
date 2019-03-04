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
        case 'REMOVE_OPTION': {
            const { optionIndex } = action.payload;
            let { options } = state;
            options = options.slice();
            options.splice(optionIndex, 1);
            return {
                ...state,
                options
            };
        }
        default:
            return state;
    }
}
