import { combineReducers } from "redux";

// reducer to hold the front end state for all proposals
function proposals(state = [], action) {
    switch (action.type) {
        case 'SET_PROPS':
            return action.payload;
        default:
            return state;
    }
}

// reducer to hold the front end state for the proposals related to the logged in user
function userProposals(state = [], action) {
    switch (action.type) {
        case 'SET_USER_PROPS':
            return action.payload;
        default:
            return state;
    }
}

// // reducer to hold the front end state for the proposal votes related to the logged in user
function userVotes(state = [], action){
    switch (action.type) {
        case 'SET_USER_VOTES':
            return action.payload;
        default: 
            return state;
    }
}

const propReducer = combineReducers({ main: proposals, user: userProposals, user_votes: userVotes });

export default propReducer;
