import { combineReducers } from "redux";

function proposals(state = [], action) {
    switch (action.type) {
        case 'SET_PROPS':
            return action.payload;
        default:
            return state;
    }
}

function userProposals(state = [], action) {
    switch (action.type) {
        case 'SET_USER_PROPS':
            return action.payload;
        default:
            return state;
    }
}

const propReducer = combineReducers({ main: proposals, user: userProposals });

export default propReducer;

// NOTE: look into yield all