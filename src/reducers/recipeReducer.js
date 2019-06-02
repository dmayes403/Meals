import { FETCH_CATEGORIES } from '../actions/types';

const startingState = {
    categories: []
};

export default function(state = startingState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
            console.log(state);
            console.log(action.payload);
            const newState = {
                ...state,
                categories: action.payload
            }
            console.log(newState);
            return newState;
        default:
            return state;
    }
}